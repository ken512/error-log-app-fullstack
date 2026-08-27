import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ErrorLog } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";

export type CreatedTag = {
  id: string;
  tag_name: string;
};

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
      tags,
    } = body;

    const errorLogData = await prisma.$transaction(async(tx) => {

    const [createdErrorLog] = await tx.$queryRaw<ErrorLog[]>` INSERT INTO "ErrorLog" (
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
    RETURNING *`;

    // タグを登録し、ErrorLogTagで関連付ける
    const createdTags: CreatedTag[] = [];
    for(const tagName of tags) {
      const tagId = uuidv4();

      const [tag] = await tx.$queryRaw<CreatedTag[]>`
      INSERT INTO "Tag" (
      "id",
      "tag_name",
      "created_at",
      "updated_at")
      VALUES (
      ${tagId},
      ${tagName},
      NOW(),
      NOW()
      )
      ON CONFLICT ("tag_name")
      DO UPDATE SET
      "tag_name" = EXCLUDED."tag_name"
      RETURNING "id", "tag_name"`;

      const errorLogTagId = uuidv4();

      await tx.$executeRaw`
      INSERT INTO "ErrorLogTag" (
      "id",
      "errorLogId",
      "tagId")
      VALUES (
      ${errorLogTagId},
      ${createdErrorLog.id},
      ${tag.id})
      ON CONFLICT ("errorLogId", "tagId")
      DO NOTHING`;

      createdTags.push(tag);
    }
  return {
    ...createdErrorLog,
    tags: createdTags
  }
})
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
