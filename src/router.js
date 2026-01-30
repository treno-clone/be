import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import workspaceRoutes from "./modules/workspace/workspace.route.js";
import boardRoutes from "./modules/board/board.route.js";
import cardRoutes from "./modules/card/card.route.js";
import recordRoutes from "./modules/record/record.route.js";
import listRoutes from "./modules/list/list.route.js";

const appRoute = Router();

appRoute.use("/auth", authRoutes);
appRoute.use("/workspaces", workspaceRoutes);
appRoute.use("/boards", boardRoutes);
appRoute.use("/cards", cardRoutes);
appRoute.use("/records", recordRoutes);
appRoute.use("/lists", listRoutes);
export default appRoute;
