import { Router } from "express";
import { createRecord, getRecordById, getRecordsByBoardName } from "./record.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";

const recordRoutes = Router();

recordRoutes.use(checkAuth);

// Tạo record (log hành động)
recordRoutes.post("/", createRecord);
recordRoutes.get("/:id", getRecordById);
recordRoutes.get("/board/:boardName", getRecordsByBoardName);
export default recordRoutes;
