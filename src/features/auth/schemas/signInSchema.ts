import z from "zod";

export const signInSchema = z.object({
  email: z.email("正しいメールアドレスを入力してください"),

  password: z
    .string()
    .min(1, "パスワードは必須入力です")
    .min(8, "パスワードは8文字以上で入力してください"),
});