import {
  createBoard,
  getBoardsByWorkspace,
  getBoardById,
  updateBoard,
  archiveBoard,
  deleteBoard
} from "./board.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";
import { Router } from "express";
const boardRoutes = Router();

boardRoutes.use(checkAuth);

boardRoutes.get("/workspace/:workspaceId", getBoardsByWorkspace);
boardRoutes.get("/:id", getBoardById);

boardRoutes.post("/", createBoard);
boardRoutes.put("/:id", updateBoard);

boardRoutes.patch("/:id/archive", archiveBoard);
boardRoutes.delete("/:id", deleteBoard);

export default boardRoutes;
