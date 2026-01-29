import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import List from "./list.model.js";
import Card from "../card/card.model.js";

// Tạo list mới
export const createList = handleAsync(async (req, res) => {
  const { title, background_color, position, boardId } = req.body;

  const list = await List.create({
    title,
    background_color,
    position,
    board: boardId,
  });

  return handleResponse(res, 201, "Tạo list thành công", list);
});

// Lấy tất cả list theo board, kèm card và thông tin cần thiết
export const getListsWithCards = handleAsync(async (req, res) => {
  const { boardId } = req.params;

  const lists = await List.find({ board: boardId }).populate({
    path: "card",
    populate: [
      { path: "assignees", select: "username" }, // chỉ lấy tên nhân viên
      { path: "labels", select: "color" }, // chỉ lấy màu label
      { path: "subtasks", select: "isCompleted" }, // lấy trạng thái subtask
    ],
  });

  const formattedLists = lists.map((list) => {
    const cards = list.card.map((card) => {
      const totalSubtasks = card.subtasks.length;
      const completedSubtasks = card.subtasks.filter(
        (st) => st.isCompleted,
      ).length;
      const pendingSubtasks = totalSubtasks - completedSubtasks;

      return {
        _id: card._id,
        title: card.title,
        dueDate: card.dueDate,
        assignees: card.assignees.map((a) => a.username),
        labels: card.labels.map((l) => l.color),
        totalSubtasks,
        completedSubtasks,
        pendingSubtasks,
      };
    });

    return {
      _id: list._id,
      title: list.title,
      background_color: list.background_color,
      position: list.position,
      isArchive: list.isArchive,
      cards,
    };
  });

  return handleResponse(res, 200, "Danh sách list với card", formattedLists);
});

// Lấy chi tiết list theo id
export const getListById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const list = await List.findById(id).populate("card");
  if (!list) return handleError(res, 404, "List không tồn tại");
  return handleResponse(res, 200, "Chi tiết list", list);
});

// Cập nhật list
export const updateList = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title, background_color, position, isArchive } = req.body;

  const list = await List.findByIdAndUpdate(
    id,
    { title, background_color, position, isArchive },
    { new: true },
  );

  if (!list) return handleError(res, 404, "List không tồn tại");
  return handleResponse(res, 200, "Cập nhật list thành công", list);
});

// Xóa list
export const deleteList = handleAsync(async (req, res) => {
  const { id } = req.params;

  const list = await List.findByIdAndDelete(id);
  if (!list) return handleError(res, 404, "List không tồn tại");

  return handleResponse(res, 200, "Xóa list thành công");
});
