import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";

const appRoute = Router()

appRoute.use("/auth", authRoutes)

export default appRoute