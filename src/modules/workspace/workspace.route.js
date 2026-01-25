import express from "express";
import {
  createWorkspace,
  getMyWorkspaces,
  getWorkspaceById,
  updateWorkspace,
  deleteWorkspace,
  addMember
} from "./workspace.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";
import checkBodyReq from "../../common/middlewares/checkBodyReq.js";
import { workspaceCreateSchema, workspaceUpdateSchema} from "./auth.schema.js";
import checkPermission from "../../common/middlewares/checkPermission.js";

const workspaceRoutes = express.Router();

workspaceRoutes.use(checkAuth);
workspaceRoutes.get("/", getMyWorkspaces);
workspaceRoutes.get("/:id", getWorkspaceById);

workspaceRoutes.post("/", checkBodyReq(workspaceCreateSchema) ,createWorkspace);
workspaceRoutes.put("/:id", checkBodyReq(workspaceUpdateSchema), updateWorkspace);
// workspaceRoutes.delete("/:id", checkPermission(["admin"]),deleteWorkspace);
workspaceRoutes.post("/:id/members", addMember);

export default workspaceRoutes;
