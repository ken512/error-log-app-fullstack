import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { auth } from "@/utils/auth/auth";

export const POST = async (req: NextRequest) => {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ message: "認証が必要です。" }, { status: 401 });
  }
  const errorLogId = uuidv4();
  const userId = session.user.id;
  
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

  try {
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
    const errorMessage =
      error instanceof Error ? error.message : "サーバーエラー";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
