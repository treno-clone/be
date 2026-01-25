import z from "zod";

export const workspaceCreateSchema = z.object({
  title: z.string().min(3, "Tên workspace phải có ít nhất 3 ký tự"),
});

export const workspaceUpdateSchema = z.object({
  title: z.string().min(3, "Tên workspace phải có ít nhất 3 ký tự").optional(),
});