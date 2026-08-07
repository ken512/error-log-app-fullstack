"use server";

import z from "zod";
import { signUpSchema } from "@/features/auth/schemas/signUpSchema";
import { ActionResult } from "next/dist/server/app-render/types";
import { getUserByEmail } from "../repositories/user";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

// signup全体の処理の流れ

export const signUp = async (
  values: z.infer<typeof signUpSchema>,
): Promise<ActionResult> => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password_hash, userName } = validatedFields.data;

  try {
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    const existingUser = await getUserByEmail(email);
    const db = prisma;

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: "このメールアドレスは既に登録されています。",
        },
      };
    }
    await db.user.create({
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
