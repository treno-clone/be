import { Router } from "express";
import {
  getAllListsWithCards,
  getListsByBoard,
  createList,
  updateList,
  softDeleteList,
  hardDeleteList,
} from "./list.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";

const router = Router();

router.use(checkAuth);

router.get("/", getAllListsWithCards);
router.get("/board/:boardId", getListsByBoard);

router.post("/", createList);
router.put("/:id", updateList);

router.patch("/:id/soft-delete", softDeleteList);
router.delete("/:id", hardDeleteList);

export default router;
