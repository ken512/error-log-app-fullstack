export const signUpFields = [
  {
    name: "userName",
    label: "ユーザー名",
    type: "text",
  },
  {
    name: "email",
    label: "メールアドレス",
    type: "email",
  },
  {
    name: "password",
    label: "パスワード",
    type: "password",
  },
] as const;

export const loginFields = [
  {
    name: "email",
    label: "メールアドレス",
    type: "email",
  },
  {
    name: "password",
    label: "パスワード",
    type: "password",
  },
] as const;