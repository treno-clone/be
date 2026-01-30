import z from "zod";

export const signupSchema = z.object({
  username: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

export const signinSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
export const sendResetLinkSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

export const setNewPasswordSchema = z.object({
  newPassword: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  resetToken: z.string(),
});
