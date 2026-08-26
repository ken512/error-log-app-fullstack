import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ErrorLog } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";

export const GET = async () => {
  try {
    const userId = await getCurrentUser();
    const errorLogListData = await prisma.$queryRaw<ErrorLog[]>
    `SELECT "id",
        "title",
        "status",
        "os",
        "framework",
        "framework_version",
        "solution",
        "cause",
        "error_message"
        FROM "ErrorLog"
        WHERE "userId" = ${userId}
        ORDER BY "created_at" DESC`;

    if (!errorLogListData || errorLogListData.length === 0) {
      return NextResponse.json(
        { message: "エラーログの情報が見つかりません。" },
        { status: 404 },
      );
    }

    const response = {
      status: "OK",
      errorlog: errorLogListData
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
