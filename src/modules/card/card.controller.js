import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Card from "./card.model.js";
// Tạo card mới
export const createCard = handleAsync(async (req, res) => {
  const { title, listId, position, description, dueDate } = req.body;

  const card = await Card.create({
    title,
    listId,
    position,
    description,
    dueDate,
  });

  return handleResponse(res, 201, "Tạo card thành công", card);
});

// Lấy tất cả card
export const getCards = handleAsync(async (req, res) => {
  const cards = await Card.find();
  return handleResponse(res, 200, "Danh sách card", cards);
});

// Lấy chi tiết card
export const getCardById = handleAsync(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findById(id)
    .populate("assignees", "username email")
    .populate("labels", "color");

  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Chi tiết card", card);
});

// Cập nhật card
export const updateCard = handleAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const card = await Card.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Cập nhật card thành công", card);
});
// xóa mềm
export const softDeleteCard = handleAsync(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findByIdAndUpdate(
    id,
    { isArchive: true },
    { new: true },
  );

  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Xóa card thành công");
});

// Xóa card - xóa cứng
export const hardDeleteCard = handleAsync(async (req, res) => {
  const { id } = req.params;

  const card = await Card.findByIdAndDelete(id);
  if (!card) return handleError(res, 404, "Card không tồn tại");

  return handleResponse(res, 200, "Xóa card thành công");
});

// Card theo list
export const getCardsByList = handleAsync(async (req, res) => {
  const { listId } = req.params;

  const cards = await Card.find({
    listId,
    isArchive: false,
  }).sort({ position: 1 });

  return handleResponse(res, 200, "Danh sách card", cards);
});
