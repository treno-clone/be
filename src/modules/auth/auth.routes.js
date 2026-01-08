import { Router } from "express";
import { Signin, Signup } from "./auth.controller.js";
const authRoutes = Router();

authRoutes.post("/signup", Signup);
authRoutes.post("/signin", Signin);

export default authRoutes;