import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ErrorLog } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";
import { Tag } from "@/generated/prisma";
import { v4 as uuidv4 } from "uuid";

type UpdatedTag = Pick<Tag, "id" | "tag_name">;

export const PUT = async (req: NextRequest,{params}: {params: Promise<{id: string}>}) => {

  try {
    const { id: errorLogId } = await params;
    const userId = await getCurrentUser();

    const body = await req.json();
    const {
      title,
      status,
      os,
      framework,
      framework_version,
      solution,
      cause,
      error_message,
      tags,
    } = body;

  const updatedErrorLog = await prisma.$transaction(async (tx) => {

    // 本人のErrorLogIdか確認
  const errorLogs = await tx.$queryRaw<{ id: string }[]>
  `SELECT "id"
  FROM "ErrorLog"
  WHERE "id" = ${errorLogId}
    AND "userId" = ${userId}`;

    if(errorLogs.length === 0) {
      throw new Error("NotFound");
    };

    // ErrorLogを更新
  const [errorLog] = await tx.$queryRaw<ErrorLog[]>
  `UPDATE "ErrorLog"
  SET
    "title" = ${title},
    "status" = ${status}::"ResolutionStatus",
    "os" = ${os},
    "framework" = ${framework},
    "framework_version" = ${framework_version},
    "solution" = ${solution},
    "cause" = ${cause},
    "error_message" = ${error_message},
    "updated_at" = NOW()
    WHERE "id" = ${errorLogId} 
      AND "userId" = ${userId}
    RETURNING *  
    `;

    // 以前のタグ関連だけを削除
    await tx.$executeRaw
    `DELETE FROM "ErrorLogTag"
    WHERE "errorLogId" = ${errorLogId}`;

    const updatedTag: UpdatedTag [] = [];
    const uniqueTags = [...new Set<string>(tags)];
    for(const TagName of uniqueTags) {
      const tagId = uuidv4();

      const [tag] = await tx.$queryRaw<UpdatedTag[]>
      `INSERT INTO "Tag" (
      "id",
      "tag_name",
      "updated_at")
      VALUES (
      ${tagId},
      ${TagName},
      NOW()
      )
      ON CONFLICT ("tag_name")
      DO UPDATE SET
      "tag_name" = EXCLUDED."tag_name"
      RETURNING "id", "tag_name"`;

      const errorLogTagId = uuidv4();

      await tx.$executeRaw
      `INSERT INTO "ErrorLogTag" (
      "id",
      "errorLogId",
      "tagId")
      VALUES (
      ${errorLogTagId},
      ${errorLog.id},
      ${tag.id}
      )`;

      updatedTag.push(tag)
    }

    return {
      ...errorLog,
      tags: updatedTag
    };
});

const response = {
  status: "OK",
  message: "エラーログを更新しました。",
  errorLog: updatedErrorLog,
};
return NextResponse.json(response);
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({message: "認証が必要です。"}, {status: 401});
    }
    const errorMessage = error instanceof Error ? error.message : "サーバーエラー";
    return NextResponse.json({message: errorMessage}, {status: 500});
  }
};