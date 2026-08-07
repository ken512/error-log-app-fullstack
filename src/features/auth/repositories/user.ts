import { prisma } from "@/utils/prisma";

// 認証で使うためのDBアクセス（操作）
// メールアドレスを通じてユーザーデータを取得するメソッド
// サインアップ・ログインで活用
// メールアドレスが登録済みかを調べたいり、ログイン対象のユーザーを取得に活用

// Userテーブルから、指定されたidを持つユーザーを検索
export const getUserById = async (id: string) => {

  try {
  const user = await prisma.$queryRaw `SELECT * FROM "User" WHERE id = ${id}`;
  return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const getUserByEmail = async (email: string) => {
  // Userテーブルから指定されたemailを持つユーザーを検索
  try {
  const user = await prisma.$queryRaw `SELECT * FROM "User" WHERE email = ${email}`;
  return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

