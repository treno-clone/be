import {
  createCard,
  getCards,
  getCardById,
  updateCard,
  hardDeleteCard,
  softDeleteCard,
  getCardsByList,
} from "./card.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";
import { cardSchema } from "./card.schema.js";
import { Router } from "express";
import checkBodyReq from "../../common/middlewares/checkBodyReq.js";
const cardRoutes = Router();

cardRoutes.use(checkAuth);

cardRoutes.get("/", getCards);
cardRoutes.get("/list/:listId", getCardsByList);
cardRoutes.get("/:id", getCardById);

cardRoutes.post("/", checkBodyReq(cardSchema), createCard);
cardRoutes.put("/:id",checkBodyReq(cardSchema), updateCard);

cardRoutes.patch("/:id/archive", softDeleteCard); 
cardRoutes.delete("/:id", hardDeleteCard);   
export default cardRoutes;
