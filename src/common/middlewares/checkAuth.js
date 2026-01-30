import jwt from "jsonwebtoken";
import { JWT_ACCESS } from "../config/dotenvConfig.js";
import User from "../../modules/user/user.model.js";
import handleError from "../utils/handleError.js";

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return handleError(res, 401, "không có token");

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return handleError(res, 400, "Token không hợp lệ");
  }

  const token = parts[1];

  let decoded;
  try {
    decoded = jwt.verify(token, JWT_ACCESS);
  } catch (err) {
    return handleError(res, 401, "Token không hợp lệ hoặc đã hết hạn");
  }

  const userExist = await User.findById(decoded._id);
  if (!userExist) return handleError(res, 404, "Unauthorized");

  userExist.password = undefined;
  req.user = userExist;
  next();
};
export default checkAuth;