import { Router } from "express";
import {
  refreshToken,
  sendForgotPassword,
  setNewPassword,
  Signin,
  Signup,
} from "./auth.controller.js";
import checkBodyReq from "../../common/middlewares/checkBodyReq.js";
import {
  sendResetLinkSchema,
  setNewPasswordSchema,
  signinSchema,
  signupSchema,
} from "./auth.schema.js";
const authRoutes = Router();
authRoutes.post("/signup", checkBodyReq(signupSchema), Signup);
authRoutes.post("/signin", checkBodyReq(signinSchema), Signin);

//Password
authRoutes.post(
  "/send-reset-link",
  checkBodyReq(sendResetLinkSchema),
  sendForgotPassword,
);
authRoutes.post("/reset-password", checkBodyReq(setNewPasswordSchema), setNewPassword);

//Token
authRoutes.post("/refresh-token", refreshToken);
export default authRoutes;
