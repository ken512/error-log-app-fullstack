import { getUserByEmail } from "@/features/auth/repositories/user";
import { signUpSchema } from "@/features/auth/schemas/signUpSchema";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { NextAuthConfig } from "next-auth";

// 認証プロバイダーとして、Credentialsを使用。
/*
Credentialsは、ユーザー名とパスワードを使用して認証するためのプロバイダー。
Credentialsを使用すると、ユーザー名と話スワードを使用して認証するためのカスタム認証ロジックを実装することができる。
authorizeメソッドは、認証に成功した場合はユーザーを返し、失敗の場合はnullを返す。
成功した場合のユーザー情報は、セッションとして保存される。
*/ 
export default {
  providers: [
    // TODO: Google認証を追加する


    Credentials({
      async authorize(credentials) {
        const validatedFields = signUpSchema.safeParse(credentials);

        if(validatedFields.success) {
          const {email, password} = validatedFields.data;

          const user = await getUserByEmail(email);
          if(!user || !user.password_hash) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password_hash);

          if(passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;