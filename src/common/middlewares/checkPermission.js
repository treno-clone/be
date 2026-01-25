import handleError from "../utils/handleError.js";

const checkPermission = (roles) => (req, res, next) => {
  if (!req.user) return handleError(res, 401, "Unauthorized");

  const hasRole = roles.includes(req.user.role);
  if (!hasRole) return handleError(res, 403, "Forbidden: Bạn không có quyền!");

  next();
};
export default checkPermission;