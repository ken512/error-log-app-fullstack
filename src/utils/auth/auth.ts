import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import authConfig from "./auth.config";
import { prisma } from "@/lib/prisma";
import { signInSchema } from "@/features/auth/schemas/signInSchema";
import { getUserByEmail } from "@/features/auth/repositories/user";


// ログイン機能の検証ロジックの設定

// 認証プロバイダーとして、Credentialsを使用。
/*
Credentialsは、ユーザー名とパスワードを使用して認証するためのプロバイダー。
Credentialsを使用すると、ユーザー名と話スワードを使用して認証するためのカスタム認証ロジックを実装することができる。
authorizeメソッドは、認証に成功した場合はユーザーを返し、失敗の場合はnullを返す。
成功した場合のユーザー情報は、セッションとして保存される。
*/ 

// authorizeは、認証に本当に成功したのかを判断する。
/*
・受け取った認証情報を検証する。
・メールアドレス・ユーザーを検索する。
・入力されたパスワードとハッシュを照合する。
・成功ならユーザーに返す。
・失敗ならnullを返す。
*/

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  providers: [
    // TODO: Google認証を追加する

    Credentials({
      async authorize(credentials) {
        const validatedFields =
          signInSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);

        if (!user || !user.password_hash) {
          return null;
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password_hash
        );

        return passwordsMatch ? user : null;
      },
    }),
  ],
});