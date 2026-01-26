import express from "express";
import {
  createLabel,
  getLabels,
  getLabelById,
  updateLabel,
  deleteLabel,
  addLabelToCard,
  removeLabelFromCard
} from "./label.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

// CRU Label
router.post("/", createLabel);          
router.get("/", getLabels);             
router.get("/:id", getLabelById);    
router.put("/:id", updateLabel);        
router.delete("/:id", deleteLabel);    

// Gán / bỏ label 
router.post("/:cardId/add", addLabelToCard);      
router.post("/:cardId/remove", removeLabelFromCard);

export default router;
