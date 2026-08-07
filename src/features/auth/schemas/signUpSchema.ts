import z from "zod";

// サインアップようのバリデーションの型定義
export const signUpSchema = z.object({
  email: z.email(),
  password_hash: z.string().min(8),
  userName: z.string().min(4),
});
