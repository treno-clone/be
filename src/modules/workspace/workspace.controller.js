import handleAsync from "../../common/utils/handleAsync.js";
import handleError from "../../common/utils/handleError.js";
import handleResponse from "../../common/utils/handleResponse.js";
import Workspace from "./Workspace.js";

// Tạo workspace mới
export const createWorkspace = handleAsync(async (req, res) => {
  const { title, description } = req.body;
  const owner = req.user._id;

  const workspace = await Workspace.create({
    title,
    description,
    owner,
    members: [{ user: owner, role: "admin" }],
  });

  return handleResponse(res, 201, "Tạo workspace thành công", workspace);
});

// Lấy tất cả workspace mà user tham gia
export const getMyWorkspaces = handleAsync(async (req, res) => {
  const userId = req.user._id;

  const workspaces = await Workspace.find({
    $or: [{ owner: userId }, { "members.user": userId }],
  })
    .populate("owner", "username email")
    .populate("members.user", "username email");

  return handleResponse(res, 200, "Danh sách workspace", workspaces);
});

// Lấy chi tiết workspace
export const getWorkspaceById = handleAsync(async (req, res) => {
  const { id } = req.params;

  const workspace = await Workspace.findById(id)
    .populate("owner", "username email")
    .populate("members.user", "username email");

  if (!workspace) return handleError(res, 404, "Workspace không tồn tại");

  return handleResponse(res, 200, "Chi tiết workspace", workspace);
});

// Cập nhật workspace
export const updateWorkspace = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, visibility } = req.body;

  const workspace = await Workspace.findByIdAndUpdate(
    id,
    { title, description, visibility },
    { new: true },
  );

  if (!workspace) return handleError(res, 404, "Workspace không tồn tại");

  return handleResponse(res, 200, "Cập nhật workspace thành công", workspace);
});

// Xóa workspace
export const deleteWorkspace = handleAsync(async (req, res) => {
  const { id } = req.params;

  const workspace = await Workspace.findByIdAndDelete(id);
  if (!workspace) return handleError(res, 404, "Workspace không tồn tại");

  return handleResponse(res, 200, "Xóa workspace thành công");
});

// Thêm thành viên vào workspace
export const addMember = handleAsync(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.body;
  const workspace = await Workspace.findById(id);
  if (!workspace) return handleError(res, 404, "Workspace không tồn tại");
  const currentUserId = req.user._id.toString();
  const isOwner = workspace.owner.toString() === currentUserId;
  const isAdmin = workspace.members.some(
    (m) => m.user.toString() === currentUserId && m.role === "admin",
  );
  if (!isOwner && !isAdmin) {
    return handleError(res, 403, "Bạn không có quyền thêm thành viên.");
  }
  // kiểm tra thành viên có tồn tại
  const memeberExists = workspace.members.some(
    (member) => member.user.toString() === userId,
  );
  if (memeberExists)
    return handleError(res, 400, "Thành viên đã có trong workspace");

  workspace.members.push({ user: userId, role });
  await workspace.save();

  return handleResponse(res, 200, "Thêm thành viên thành công", workspace);
});
