import { z } from "zod";

export const boardCreateSchema = z.object({
  title: z.string()
    .min(3, { message: "Tiêu đề phải có ít nhất 3 ký tự" })
    .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" }),
  workspaceId: z.string({ required_error: "WorkspaceId là bắt buộc" }),
  background: z.string().optional()
});

export const boardUpdateSchema = z.object({
  title: z.string()
    .min(3, { message: "Tiêu đề phải có ít nhất 3 ký tự" })
    .max(100, { message: "Tiêu đề không được vượt quá 100 ký tự" })
    .optional(),
  background: z.string().optional(),
  isArchive: z.boolean().optional()
});
