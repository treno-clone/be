import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Card from "../card/card.model.js";
import List from "./list.model.js";

// Lấy ds list kèm card
export const getAllListsWithCards = handleAsync(async (req, res) => {
  const lists = await List.find();

  const result = await Promise.all(
    lists.map(async (list) => {
      const cards = await Card.find({ listId: list._id })
        .populate("assignees", "username")
        // .populate("labels", select:"color");

      return {
        _id: list._id,
        title: list.title,
        background_color: list.background_color,
        position: list.position,
        isArchive: list.isArchive,
        boardId: list.boardId,
        cards: cards.map((card) => ({
          _id: card._id,
          title: card.title,
          dueDate: card.dueDate,
          assignees: card.assignees.map((a) => a.username),
          labels: card.labels.map((l) => l.color),
        })),
      };
    }),
  );

  return handleResponse(res, 200, "Danh sách list kèm card", result);
});

//Danh sách list theo board
export const getListsByBoard = handleAsync(async (req, res) => {
  const { boardId } = req.params;
  const lists = await List.find({ boardId });

  const result = await Promise.all(
    lists.map(async (list) => {
      const cards = await Card.find({ listId: list._id })
        .populate("assignees", "username")
        .populate("labels", "color");

      return { ...list.toObject(), cards };
    }),
  );

  return handleResponse(res, 200, "Danh sách list theo board", result);
});

// Tạo mới
export const createList = handleAsync(async (req, res) => {
  const { title, background_color, position, boardId } = req.body;
  const list = await List.create({
    title,
    background_color,
    position,
    boardId,
  });
  return handleResponse(res, 201, "Tạo list thành công", list);
});

// Cập nhật
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

// Xóa mềm
export const softDeleteList = handleAsync(async (req, res) => {
  const { id } = req.params;
  const list = await List.findByIdAndUpdate(
    id,
    { isArchive: true },
    { new: true },
  );
  if (!list) return handleError(res, 404, "List không tồn tại");
  return handleResponse(res, 200, "Lưu trữ list thành công", list);
});

// Xóa cứng
export const hardDeleteList = handleAsync(async (req, res) => {
  const { id } = req.params;
  const list = await List.findByIdAndDelete(id);
  if (!list) return handleError(res, 404, "List không tồn tại");
  return handleResponse(res, 200, "Xóa cứng list thành công");
});
