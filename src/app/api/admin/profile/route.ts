import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const PUT = async (req: NextRequest) => {
  try {
    const userId = await getCurrentUser();
    const body = await req.json();
    const { userName, profileIcon, xUrl, instagramUrl, threadsUrl, githubUrl } = body;
    // SETで、対象の行のみを更新
    const userData = await prisma.$executeRaw`
      UPDATE "User"
      SET 
        "userName" = ${userName ?? null},
        "profileIcon" = ${profileIcon ?? null},
        "xUrl" = ${xUrl ?? null},
        "instagramUrl" = ${instagramUrl ?? null},
        "threadsUrl" = ${threadsUrl ?? null},
        "githubUrl" = ${githubUrl ?? null},
        "updated_at" = NOW()
      WHERE "id" = ${userId}
    `;

    if (!userData || userData === 0) {
      return NextResponse.json(
        { message: "更新対象のユーザーが見つかりません。" },
        { status: 404 },
      );
    }

    const response = {
      status: "OK",
      message: "ユーザーアカウント情報を更新しました。",
      userData: userData,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { message: "認証が必要です。" },
        { status: 401 },
      );
    }
    const errorMessage =
      error instanceof Error ? error.message : "サーバーエラー";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};