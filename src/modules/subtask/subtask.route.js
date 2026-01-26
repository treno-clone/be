import express from "express";
import {
  createSubtask,
  getSubtasksByCard,
  getSubtaskById,
  updateSubtask,
  deleteSubtask,
  toggleSubtaskCompletion
} from "./subtask.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.post("/cards/:cardId/subtasks", createSubtask);
router.get("/cards/:cardId/subtasks", getSubtasksByCard);
router.get("/subtasks/:id", getSubtaskById);
router.put("/subtasks/:id", updateSubtask);
router.delete("/subtasks/:id", deleteSubtask);
router.patch("/subtasks/:id/toggle", toggleSubtaskCompletion);

export default router;
