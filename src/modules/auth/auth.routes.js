import { Router } from "express";
import {   refreshToken, sendForgotPassword, setNewPassword, Signin, Signup } from "./auth.controller.js";
const authRoutes = Router();

authRoutes.post("/signup", Signup);
authRoutes.post("/signin", Signin);

//Password
authRoutes.post("/send-reset-link", sendForgotPassword);
authRoutes.post("/reset-password", setNewPassword);

//Token
authRoutes.post("/refresh-token", refreshToken)
export default authRoutes;