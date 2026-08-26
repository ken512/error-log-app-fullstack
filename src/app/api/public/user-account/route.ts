import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";

export const GET = async () => {
  // 特定のユーザー情報である、userName, Icon画像、xUrl, instagramUrl,githubUrl, threadsUrl, githubUrl,のユーザー情報を取得、更新

  try {
    const userId = await getCurrentUser();
    const userData = await prisma.$queryRaw<User[]>`SELECT "id", "userName",
        "profileIcon",
        "xUrl",
        "threadsUrl",
        "githubUrl"
        FROM "User"
        WHERE "id" = ${userId}`;

    if (!userData || userData.length === 0) {
      return NextResponse.json(
        { message: "ユーザー情報がありません" },
        { status: 404 },
      );
    }

    const user = userData[0];

    const response = {
      status: "OK",
      user: {
        userId: user.id,
        userName: user.userName,
        profileIcon: user.profileIcon,
        xUrl: user.xUrl,
        threadsUrl: user.threadsUrl,
        githubUrl: user.githubUrl,
      },
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

export const PUT = async (req: NextRequest) => {
  try {
    const userId = await getCurrentUser();
    const body = await req.json();
    const { userName, profileIcon, xUrl, threadsUrl, githubUrl } = body;
    // SETで、対象の行のみを更新
    const userData = await prisma.$executeRaw`
      UPDATE "User"
      SET 
        "userName" = ${userName},
        "profileIcon" = ${profileIcon},
        "xUrl" = ${xUrl},
        "threadsUrl" = ${threadsUrl},
        "githubUrl" = ${githubUrl},
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
