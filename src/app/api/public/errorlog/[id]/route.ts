import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ErrorLog } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";

export const GET = async (_rea: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  try {
    const userId = await getCurrentUser();
    const { id: errorLogId } = await params;

    const detailErrorLogData = await prisma.$queryRaw<ErrorLog[]>`SELECT 
    el."id",
    el."title",
    el."status",
    el."os",
    el."framework",
    el."framework_version",
    el."solution",
    el."cause",
    el."error_message",

    COALESCE(
    (
    SELECT jsonb_agg(
    jsonb_build_object(
    'id', t."id",
    'tag_name', t."tag_name"
      )
    )
      FROM "ErrorLogTag" elt
      INNER JOIN "Tag" t
      ON t."id" = elt."tagId"
      WHERE elt."errorLogId" = el."id"
    ),
    '[]'::jsonb
    ) AS "tags"
    
    FROM "ErrorLog" el
    WHERE el."id" = ${errorLogId}
      AND el."userId" = ${userId}
    `;

    const detailErrorLog = detailErrorLogData[0];

    if (!detailErrorLog) {
      return NextResponse.json(
        { message: "エラーログの情報がありません。" },
        { status: 404 },
      );
    }

    const response = {
      status: "OK",
      detailErrorLog: detailErrorLog,
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
