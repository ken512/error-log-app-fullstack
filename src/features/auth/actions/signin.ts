"use server";

import z from "zod";
import { signInSchema } from "../schemas/signInSchema";
import { ActionsResult } from "./actionsResult";
import { signIn as NextAuthSignIn } from "@/utils/auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/utils/auth/routes";
import { AuthError } from "next-auth";

// signin全体の処理の流れ
// 入力値を検証
// フォームとAuth.jsを繋ぐ窓口
/*
・フォームからの入力値を受け取る
・入力形式を検証する
・Auth.jsの認証処理を呼び出す
・認証エラーを画面向けのメッセージに変換する
・処理成功時のリダイレクト先を指定する
*/

export const signIn = async (
  values: z.infer<typeof signInSchema>,
): Promise<ActionsResult> => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password } = validatedFields.data;

  /*
  Auth.jsのsignIn関数を使って認証を行う。
  signIn関数は、認証に成功した馬青はredirectToで指定したURLにダイレクトし、失敗したらエラーをスローする。

  ここで指定したエラーの種類はCredentialsSigninを設定している。
  これはサインアップ済みユーザーが、誤ったメールアドレスまたはパスワードでログインしようとした場合に、スローされるエラー。
  */ 


  try {
    await NextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      isSuccess: true,
      message: "ログイン成功しました。",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: {
              message: "メールアドレスまたはパスワードが間違っています。",
            },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: "ログインに失敗しました",
            },
          };
      }
    }
    throw error;
  }
};
