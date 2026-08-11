import { prisma } from "@/utils/prisma";

// 認証で使うためのDBアクセス（操作）
// メールアドレスを通じてユーザーデータを取得するメソッド
// サインアップ・ログインで活用
// メールアドレスが登録済みかを調べたいり、ログイン対象のユーザーを取得に活用

// Userテーブルから、指定されたidを持つユーザーを検索

export type User = {
  id: string;
  userName: string;
  email: string;
  password_hash: string;
};

// idからUserを探す
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const users =
      await prisma.$queryRaw<User[]>`SELECT id, "userName",email, password_hash FROM "User" WHERE id = ${id}`;
    return users[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// EmailからUserを探す
export const getUserByEmail = async (email: string): Promise<User | null> => {
  // Userテーブルから指定されたemailを持つユーザーを検索

  try {
    const users = await prisma.$queryRaw<
      User[]
    >`SELECT id, "userName", email, password_hash FROM "User" WHERE email = ${email}`;
    return users[0] ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
