import { cache } from "react";
import { auth } from "@/utils/auth/auth";

// セッション取得して認証情報を確認し、ログイン中のユーザーIDを返す共通関数
// cacheで重複処理を防ぐ
export const getCurrentUser = cache(async () => {
  // Auth.jsからセッションを取得
  const session = await auth();
  // セッションまたはユーザーIDがなければ未認証
  if (!session || !session.user || !session.user.id) {
      throw new Error("UNAUTHORIZED");
  };

  return session.user.id;
});
