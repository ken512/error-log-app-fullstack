import NextAuth from "next-auth";
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "@/lib/prisma";
import authConfig from "./auth.config";

// sinUp時に、PrismaAdapterインターフェースを使用して、Prismaを介してユーザー情報をDBに保存するために使う。
// セッション保存には、JWTを使用して、サーバーのメモリを節約。
// ...スプレッド構文で、auth.config.tsで定義したプロバイダーの設定を引き継ぐ。

export const {
  handlers: { GET, POST},
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt"},
  ...authConfig,
})