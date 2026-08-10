import z from "zod";

// サインアップようのバリデーションの型定義
export const signUpSchema = z.object({
  email: z.email("メールアドレスは必須入力です"),
  password: z.string("正しいメールアドレスで入力してください").min(8),
  userName: z.string().min(1,"ユーザー名は必須入力です").max(20, "ユーザー名は20文字以内にしてください。"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;