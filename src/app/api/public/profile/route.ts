import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { User } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";

export const GET = async () => {
  // 特定のユーザー情報である、userName, Icon画像、xUrl, instagramUrl,githubUrl, threadsUrl, githubUrl,のユーザー情報を取得、更新

  try {
    const userId = await getCurrentUser();
    const userData = await prisma.$queryRaw<User[]>`SELECT "id", "userName",
        "profileIcon",
        "xUrl",
        "instagramUrl",
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
        instagramUrl: user.instagramUrl,
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