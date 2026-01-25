import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import workspaceRoutes from "./modules/workspace/workspace.route.js";
import boarRoutes from "./modules/board/board.route.js";

const appRoute = Router()

appRoute.use("/auth", authRoutes);
appRoute.use("/workspaces", workspaceRoutes);
appRoute.use("/boards",  boarRoutes);
export default appRoute