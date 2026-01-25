import express from "express";
import {
  createBoard,
  getBoardsByWorkspace,
  getBoardById,
  updateBoard,
  archiveBoard,
  deleteBoard
} from "./board.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";

const boarRoutes = express.Router();

boarRoutes.use(checkAuth);

boarRoutes.get("/workspace/:workspaceId", getBoardsByWorkspace);
boarRoutes.get("/:id", getBoardById);

boarRoutes.post("/", createBoard);
boarRoutes.put("/:id", updateBoard);

boarRoutes.patch("/:id/archive", archiveBoard);
boarRoutes.delete("/:id", deleteBoard);

export default boarRoutes;
