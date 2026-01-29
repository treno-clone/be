import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Card from "./card.model.js";
// Tạo card mới
export const createCard = handleAsync(async (req, res) => {
  const { title, parentCardId } = req.body;
  let card = await Card.create({ title });
  if (parentCardId) {
    const parentCard = await Card.findById(parentCardId);
    if (!parentCard) return handleError(res, 404, "Parent card không tồn tại");

    parentCard.cards.push(card._id);
    await parentCard.save();
  }

  return handleResponse(res, 201, "Tạo card thành công", card);
});

// Lấy tất cả card
export const getCards = handleAsync(async (req, res) => {
  const cards = await Card.find()
  return handleResponse(res, 200, "Danh sách card", cards);
});

// Lấy chi tiết card
export const getCardById = handleAsync(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id)
  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Chi tiết card", card);
});

// Cập nhật card
export const updateCard = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const card = await Card.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );

  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Cập nhật card thành công", card);
});

// Xóa card
export const deleteCard = handleAsync(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findByIdAndDelete(id);
  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Xóa card thành công");
});
