import handleAsync from "../../common/utils/handleAsync";
import handleError from "../../common/utils/handleError";
import handleResponse from "../../common/utils/handleResponse";
import Card from "../card/card.model";
import Label from "./label.model";

export const createLabel = handleAsync(async (req, res) => {
  const { title, color } = req.body;
  const label = await Label.create({ title, color });
  return handleResponse(res, 201, "Tạo label thành công", label);
});

export const getLabels = handleAsync(async (req, res) => {
  const labels = await Label.find();
  return handleResponse(res, 200, "Danh sách label", labels);
});

export const getLabelById = handleAsync(async (req, res) => {
  const { id } = req.params;
  const label = await Label.findById(id);
  if (!label) return handleError(res, 404, "Label không tồn tại");
  return handleResponse(res, 200, "Chi tiết label", label);
});

export const updateLabel = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title, color } = req.body;
  const label = await Label.findByIdAndUpdate(
    id,
    { title, color },
    { new: true },
  );
  if (!label) return handleError(res, 404, "Label không tồn tại");
  return handleResponse(res, 200, "Cập nhật label thành công", label);
});

export const addLabelToCard = handleAsync(async (req, res) => {
  const { cardId } = req.params;
  const { labelId } = req.body;
  const card = await Card.findById(cardId);
  if (!card) return handleError(res, 404, "Card không tồn tại");
  const label = await Label.findById(labelId);
  if (!label) return handleError(res, 404, "Label không tồn tại");
  const alreadyHasLabel = card.labels.some((l) => l.toString() === labelId);
  if (alreadyHasLabel) {
    return handleError(res, 400, "Card đã có label này rồi");
  }
  card.labels.push(labelId);
  await card.save();
  return handleResponse(res, 200, "Gán label vào card thành công", card);
});
export const removeLabelFromCard = handleAsync(async (req, res) => {
  const { cardId } = req.params;
  const { labelId } = req.body;
  const card = await Card.findById(cardId);
  if (!card) return handleError(res, 404, "Card không tồn tại");
  const hasLabel = card.labels.some((l) => l.toString() === labelId);
  if (!hasLabel) return handleError(res, 400, "Card không có label này");
  card.labels = card.labels.filter((l) => l.toString() !== labelId);
  await card.save();
  return handleResponse(res, 200, "Bỏ label khỏi card thành công", card);
});
