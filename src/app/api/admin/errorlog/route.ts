import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "@/lib/auth";

export const POST = async (req: NextRequest) => {
  try {
    const errorLogId = uuidv4();
    const userId = await getCurrentUser();

    const body = await req.json();
    const {
      title,
      status,
      os,
      framework_version,
      framework,
      solution,
      cause,
      error_message,
    } = body;

    const errorLogData = await prisma.$queryRaw` INSERT INTO "ErrorLog" (
    "id",
    "userId",
    "title",
    "status",
    "os",
    "framework",
    "framework_version",
    "solution",
    "cause",
    "error_message",
    "created_at",
    "updated_at"
  )
  VALUES (
    ${errorLogId}::uuid,
    ${userId},
    ${title},
    ${status}::"ResolutionStatus",
    ${os},
    ${framework},
    ${framework_version},
    ${solution},
    ${cause},
    ${error_message},
    NOW(),
    NOW()
  )
    RETURNING *
`;

    console.log(errorLogData);

    if (!errorLogData || errorLogData === 0) {
      return NextResponse.json(
        { message: "エラーログ情報がありません" },
        { status: 404 },
      );
    }

    const response = {
      status: "OK",
      message: "エラーログを投稿しました。",
      errorLogData: errorLogData,
    };

    return NextResponse.json(response);
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
