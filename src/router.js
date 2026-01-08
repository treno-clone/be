import { Router } from "express";
import authRoutes from "./auth.routes";

const appRoute = Router()

appRoute.use("/auth", authRoutes)

export default appRoute