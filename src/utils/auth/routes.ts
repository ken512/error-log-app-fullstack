
// 認証を必要としない、誰でもアクセスできる公開ページ
export const publicRoutes: string[] = [
  "/api/public/user-account",
];

// ログインしているユーザーをルートディレクトリにリダイレクトする。
export const authRoutes: string[] = ["/signup", "/login"];

// api認証に使用されるルートのプレフィックス
export const apiAuthPrefix: string = "/api/auth";

// ユーザーがログインした後に自動的にリダイレクトされるデフォルトのパス
export const DEFAULT_LOGIN_REDIRECT: string = "/";
