import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Record from "./record.model.js";
import User from "../user/user.model.js";
import Card from "../card/card.model.js";

export const createRecord = handleAsync(async (req, res) => {
  const { userId, action, detail, cardId, assigneeId } = req.body;

  // Kiểm tra user thực hiện hành động
  const user = await User.findById(userId);
  if (!user) return handleError(res, 404, "User không tồn tại");

  let cardTitle = "";
  if (cardId) {
    const card = await Card.findById(cardId);
    if (!card) return handleError(res, 404, "Card không tồn tại");
    cardTitle = card.title;
  }
  let assigneeName = "";
  if (assigneeId) {
    const assignee = await User.findById(assigneeId);
    if (!assignee) return handleError(res, 404, "Assignee không tồn tại");
    assigneeName = assignee.username;
  }

  if (action === "update" && assigneeName && cardTitle) {
    recordDetail = `${user.username} đã gán ${assigneeName} vào công việc "${cardTitle}"`;
  }

  const record = await Record.create({
    user: userId,
    action,
    detail: recordDetail,
  });

  return handleResponse(res, 201, "Tạo record thành công", record);
});

// Lấy record theo id
export const getRecordById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const record = await Record.findById(id).populate("user", "username email");
  if (!record) return handleError(res, 404, "Record không tồn tại");
  return handleResponse(res, 200, "Chi tiết record", record);
});
// Lấy record theo tên board
export const getRecordsByBoardName = handleAsync(async (req, res) => {
  const { boardName } = req.params;
  const board = await Board.findOne({ title: boardName });
  if (!board) return handleError(res, 404, "Board không tồn tại");
  const records = await Record.find({
    detail: new RegExp(boardName, "i"),
  }).populate("user", "username email");
  return handleResponse(
    res,
    200,
    `Danh sách record của board ${boardName}`,
    records,
  );
});
