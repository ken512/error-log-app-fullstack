import z from "zod";

// サインアップようのバリデーションの型定義
export const signUpSchema = z.object({
  userName: z
    .string()
    .min(1, "ユーザー名は必須入力です")
    .max(20, "ユーザー名は20文字以内で入力してください"),

  email: z.email("正しいメールアドレスを入力してください"),

  password: z
    .string()
    .min(1, "パスワードは必須入力です")
    .min(8, "パスワードは8文字以上で入力してください"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
