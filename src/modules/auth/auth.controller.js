import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import User from "../user/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../../common/utils/sendMail.js";
import welcomeTemplate from "../../common/templates/welcome.template.js";
import {
  JWT_ACCESS,
  JWT_ACCESS_EXPIRES,
  JWT_REFRESH,
  JWT_REFRESH_EXPIRES,
  JWT_RESET_SECRET,
  JWT_RESET_SECRET_EXPIRES,
} from "../../common/config/dotenvConfig.js";
import sendResetCodeTemplate from "../../common/templates/sendResetCode.template.js";
export const Signup = handleAsync(async (req, res) => {
  const { username, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return handleError(res, 400, "Email đã tồn tại !");

  const hashPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    email,
    password: hashPassword,
    username,
  });

  newUser.password = undefined;
  await sendMail(
    newUser.email,
    "Chào mừng đến với Treno",
    welcomeTemplate(newUser.email, newUser.username),
  );
  return handleResponse(res, 201, "Đăng ký thành công !", newUser);
});

export const Signin = handleAsync(async (req, res) => {
  const { email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist?.accountLockUntil && userExist?.accountLockUntil > Date.now()) {
    const timeLeft = Math.ceil(
      (userExist.accountLockUntil - Date.now()) / 60000,
    );
    return handleError(
      res,
      403,
      `Tài khoản bị khóa. Vui lòng thử lại sau ${timeLeft} phút.`,
    );
  }
  if (!userExist)
    return handleError(res, 404, "Email hoặc mật khẩu chưa đúng.");
  const isMatched = await bcrypt.compare(password, userExist.password);
  if (!isMatched) {
    const failAttempts = (userExist.failedLoginAttempts || 0) + 1;
    const update = { failedLoginAttempts: failAttempts };

    if (failAttempts >= 5) {
      update.accountLockUntil = Date.now() + 15 * 60 * 1000; // 15 phút
      update.failedLoginAttempts = 0;
    }

    await User.findByIdAndUpdate(userExist._id, update);

    return handleError(res, 401, "Email hoặc mật khẩu chưa đúng.");
  }
  await User.findByIdAndUpdate(userExist._id, {
    failedLoginAttempts: 0,
    accountLockUntil: null,
  });
  const accessToken = jwt.sign({ _id: userExist._id }, JWT_ACCESS, {
    expiresIn: JWT_ACCESS_EXPIRES,
  });
  console.log("1");
  const refreshToken = jwt.sign({ _id: userExist._id }, JWT_REFRESH, {
    expiresIn: JWT_REFRESH_EXPIRES,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
  });

  userExist.password = undefined;
  userExist.refreshToken = undefined;

  handleResponse(res, 200, "Đăng nhập thành công.", {
    user: userExist,
    accessToken,
  });
});

export const sendForgotPassword = handleAsync(async (req, res) => {
  console.log("object");
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) return handleError(res, 404, "Email không tồn tại.");
  const resetToken = jwt.sign({ _id: userExist._id }, JWT_RESET_SECRET, {
    expiresIn: JWT_RESET_SECRET_EXPIRES,
  });
  await sendMail(email, "Đặt lại mật khẩu", sendResetCodeTemplate(resetToken));
  return handleResponse(res, 200, "Link sent");
});

export const setNewPassword = handleAsync(async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) return handleError(res, 400, "Thiếu dữ liệu.");
  try {
    const payload = jwt.verify(token, JWT_RESET_SECRET);
    const userExist = await User.findById(payload._id);
    if (!userExist) return handleError(res, 404, "Người dùng không tồn tại.");
    const hashPassword = bcrypt.hashSync(newPassword, 10);
    userExist.password = hashPassword;
    await userExist.save();
    return handleResponse(res, 200, "Đặt lại mật khẩu thành công.");
  } catch (error) {
    return handleError(res, 401, "Token không hợp lệ hoặc đã hết hạn.");
  }
});

export const refreshToken = handleAsync(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return handleError(res, 401, "Unauthenticated");
  const payload = jwt.verify(refreshToken, JWT_REFRESH);
  const existUser = await User.findOne({ refreshToken: refreshToken });
  if (!payload || !existUser)
    return handleError(res, 401, "Refresh token invalid");

  const accessToken = jwt.sign({ _id: existUser._id }, JWT_ACCESS, {
    expiresIn: JWT_ACCESS_EXPIRES,
  });
  const newRefreshToken = jwt.sign({ _id: existUser._id }, JWT_REFRESH, {
    expiresIn: JWT_REFRESH_EXPIRES,
  });
  existUser.refreshToken = newRefreshToken;

  await existUser.save();
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });

  return handleResponse(res, 200, "Refresh token successfully", accessToken);
});
