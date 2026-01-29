import { Router } from "express";
import {
  createList,
  getListsWithCards,
  getListById,
  updateList,
  deleteList,
} from "./list.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";

const listRoutes = Router();

listRoutes.use(checkAuth);

listRoutes.post("/", createList);
listRoutes.get("/board/:boardId", getListsWithCards);
listRoutes.get("/:id", getListById);
listRoutes.put("/:id", updateList);
listRoutes.delete("/:id", deleteList);

export default listRoutes;
