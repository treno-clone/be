import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/dotenvConfig.js";
import User from "../../modules/user/user.model.js";
import createError from "../utils/createError.js";

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return createError(res, 401, "No token provided");

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return createError(res, 400, "Malformed token");
  }

  const token = parts[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return createError(res, 401, "Invalid or expired token");
  }

  const userExist = await User.findById(decoded._id);
  if (!userExist) return createError(res, 404, "Unauthorized");

  userExist.password = undefined;
  req.user = userExist;
  next();
};
export default checkAuth;