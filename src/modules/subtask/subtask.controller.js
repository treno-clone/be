import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Subtask from "./subtask.model.js";
import Card from "../card/card.model.js";

// Tạo subtask mới trong card
export const createSubtask = handleAsync(async (req, res) => {
  const { cardId } = req.params;
  const { title, assignee, dueDate } = req.body;

  const card = await Card.findById(cardId);
  if (!card) return handleError(res, 404, "Card không tồn tại");

  const subtask = await Subtask.create({
    title,
    assignee,
    dueDate,
    card: cardId,
  });

  card.subtasks.push(subtask._id);
  await card.save();

  return handleResponse(res, 201, "Tạo subtask thành công", subtask);
});

// Lấy tất cả subtask của card
export const getSubtasksByCard = handleAsync(async (req, res) => {
  const { cardId } = req.params;

  const subtasks = await Subtask.find({ card: cardId }).populate(
    "assignee",
    "username email",
  );
  return handleResponse(res, 200, "Danh sách subtask", subtasks);
});

// Lấy chi tiết subtask
export const getSubtaskById = handleAsync(async (req, res) => {
  const { id } = req.params;

  const subtask = await Subtask.findById(id).populate(
    "assignee",
    "username email",
  );
  if (!subtask) return handleError(res, 404, "Subtask không tồn tại");

  return handleResponse(res, 200, "Chi tiết subtask", subtask);
});

// Cập nhật subtask
export const updateSubtask = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title, assignee, dueDate, isCompleted } = req.body;

  const subtask = await Subtask.findByIdAndUpdate(
    id,
    { title, assignee, dueDate, isCompleted },
    { new: true },
  );

  if (!subtask) return handleError(res, 404, "Subtask không tồn tại");

  return handleResponse(res, 200, "Cập nhật subtask thành công", subtask);
});

// Xóa subtask
export const deleteSubtask = handleAsync(async (req, res) => {
  const { id } = req.params;

  const subtask = await Subtask.findByIdAndDelete(id);
  if (!subtask) return handleError(res, 404, "Subtask không tồn tại");

  return handleResponse(res, 200, "Xóa subtask thành công");
});

// Đánh dấu hoàn thành
export const toggleSubtaskCompletion = handleAsync(async (req, res) => {
  const { id } = req.params;

  const subtask = await Subtask.findById(id);
  if (!subtask) return handleError(res, 404, "Subtask không tồn tại");

  subtask.isCompleted = !subtask.isCompleted;
  await subtask.save();

  return handleResponse(
    res,
    200,
    "Cập nhật trạng thái subtask thành công",
    subtask,
  );
});
