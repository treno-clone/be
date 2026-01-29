import {
  createCard,
  getCards,
  getCardById,
  updateCard,
  deleteCard,
} from "./card.controller.js";
import checkAuth from "../../common/middlewares/checkAuth.js";
import { cardSchema } from "./card.schema.js";
import { Router } from "express";
import checkBodyReq from "../../common/middlewares/checkBodyReq.js";
const cardRoutes = Router();

cardRoutes.use(checkAuth);

cardRoutes.post("/", checkBodyReq(cardSchema), createCard);
cardRoutes.get("/", getCards);
cardRoutes.get("/:id", getCardById);
cardRoutes.put("/:id",checkBodyReq(cardSchema), updateCard);
cardRoutes.delete("/:id", deleteCard);

export default cardRoutes;
