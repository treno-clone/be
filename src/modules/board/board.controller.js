import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Card from "../card/card.model.js";
import List from "../list/list.model.js";
import Workspace from "../workspace/workspace.model.js";
import Board from "./board.model.js";
// Tạo board mới trong workspace
export const createBoard = handleAsync(async (req, res) => {
  const { title, background, workspaceId } = req.body;
  const userId = req.user._id;

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) return handleError(res, 404, "Workspace không tồn tại");

  // check permission
  const isOwner = workspace.owner.toString() === userId.toString();
  const isAdmin = workspace.members.some(
    (m) =>
      (m.user.toString() === userId.toString() && m.role === "member") ||
      m.role === "memeber",
  );
  if (!isOwner && !isAdmin) {
    return handleError(
      res,
      403,
      "Bạn không có quyền tạo board trong workspace này.",
    );
  }

  const board = await Board.create({
    title,
    background,
    workspace: workspaceId,
    members: [userId],
  });
  workspace.boards.push(board._id);
  await workspace.save();
  return handleResponse(res, 201, "Tạo board thành công", board);
});

// Lấy tất cả board trong workspace
export const getBoardsByWorkspace = handleAsync(async (req, res) => {
  const { workspaceId } = req.params;
  const boards = await Board.find({
    workspace: workspaceId,
    isArchive: false,
  }).populate("members", "username email");

  if (!boards)
    return handleError(
      res,
      404,
      "Không tìm thấy board nào trong workspace này",
    );
  return handleResponse(res, 200, "Danh sách board", boards);
});

// Lấy chi tiết board
export const getBoardById = handleAsync(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findById(id)
    .populate("members", "username email")
    .populate("workspace", "title owner");

  if (!board) return handleError(res, 404, "Board không tồn tại");
  const lists = await List.find({
    boardId: id,
    isArchive: false,
  }).sort({ position: 1 });

  //Lấy card của các list
  const listIds = lists.map((l) => l._id);

  const cards = await Card.find({
    listId: { $in: listIds },
    isArchive: false,
  }).sort({ position: 1 });

  //Group card theo listId
  const cardMap = {};
  cards.forEach((card) => {
    const key = card.listId.toString();
    if (!cardMap[key]) cardMap[key] = [];
    cardMap[key].push(card);
  });

  //Gắn card vào list
  const listsWithCards = lists.map((list) => ({
    ...list.toObject(),
    cards: cardMap[list._id.toString()] || [],
  }));
  return handleResponse(res, 200, "Lấy chi tiết board thành công", {
    board,
    lists: listsWithCards,
  });
});

// Cập nhật board
export const updateBoard = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title, background } = req.body;

  const board = await Board.findByIdAndUpdate(
    id,
    { title, background },
    { new: true },
  );

  if (!board) return handleError(res, 404, "Board không tồn tại");

  return handleResponse(res, 200, "Cập nhật board thành công", board);
});

// Archive board
export const archiveBoard = handleAsync(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findByIdAndUpdate(
    id,
    { isArchive: true },
    { new: true },
  );

  if (!board) return handleError(res, 404, "Board không tồn tại");

  return handleResponse(res, 200, "Board đã được archive", board);
});

// Xóa board
export const deleteBoard = handleAsync(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findByIdAndDelete(id);
  if (!board) return handleError(res, 404, "Board không tồn tại");

  return handleResponse(res, 200, "Xóa board thành công");
});
