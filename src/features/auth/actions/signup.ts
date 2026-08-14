"use server";

import z from "zod";
import { signUpSchema } from "@/features/auth/schemas/signUpSchema";
import { getUserByEmail } from "../repositories/user";
import { prisma } from "@/lib/prisma";
import { ActionsResult } from "./actionsResult";
import bcrypt from "bcrypt";

// signup全体の処理の流れ

export const signUp = async (
  values: z.infer<typeof signUpSchema>,
): Promise<ActionsResult> => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password, userName } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);


    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: "このメールアドレスは既に登録されています。",
        },
      };
    }
  const user = await prisma.user.create({
      data: {
        userName: userName,
        email: email,
        password_hash: hashedPassword,
      },
    });

    return {
      isSuccess: true,
      message: "サインアップに成功しました。",
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      error: {
        message: "サインアップに失敗しました。",
      },
    };
  }
};
