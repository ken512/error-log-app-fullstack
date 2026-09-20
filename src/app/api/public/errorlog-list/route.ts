import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ErrorLog } from "@/generated/prisma";
import { getCurrentUser } from "@/lib/auth";
import { calculatePagination } from "@/utils/calculatePagination";

type CountResult = {
  total: number;
};

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getCurrentUser();
    const keyword = req.nextUrl.searchParams.get("keyword")?.trim() ?? "";
    const searchKeyword = `%${keyword}%`;

    const PAGE_SIZE = 5;
    const MAX_ITEMS = 9999;
    const requestedPage = Number(req.nextUrl.searchParams.get("page"));

    // 条件に一致する総件数を取得
    const [countResult] = await prisma.$queryRaw<
      CountResult[]
    >`SELECT COUNT(*)::int AS "total"
        FROM "ErrorLog" el
        WHERE el."userId" = ${userId}
        AND (
          ${keyword} = ''
          OR el."title" ILIKE ${searchKeyword}
        OR el."error_message" ILIKE ${searchKeyword}
        OR el."cause" ILIKE ${searchKeyword}
        OR el."solution" ILIKE ${searchKeyword}
        OR el."framework" ILIKE ${searchKeyword}
        OR el."framework_version" ILIKE ${searchKeyword}
        OR el."os" ILIKE ${searchKeyword} 
        OR EXISTS (
          SELECT 1
          FROM "ErrorLogTag" elt
          INNER JOIN "Tag" t
            ON t."id" = elt."tagId"
          WHERE elt."errorLogId" = el."id"
            AND t."tag_name" ILIKE ${searchKeyword}
        )
      )
  `;

    const pagination = calculatePagination({
      requestedPage,
      totalCount: countResult.total,
      pageSize: PAGE_SIZE,
      maxItems: MAX_ITEMS,
    });

    const errorLogListData = await prisma.$queryRaw<ErrorLog[]>`SELECT el."id",
        el."title",
        el."status",
        el."created_at",
        el."updated_at",
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
        WHERE el."userId" = ${userId}
          AND (
      ${keyword} = ''
      OR el."title" ILIKE ${searchKeyword}
      OR el."error_message" ILIKE ${searchKeyword}
      OR el."cause" ILIKE ${searchKeyword}
      OR el."solution" ILIKE ${searchKeyword}
      OR el."framework" ILIKE ${searchKeyword}
      OR el."framework_version" ILIKE ${searchKeyword}
      OR el."os" ILIKE ${searchKeyword}
      OR EXISTS (
          SELECT 1
          FROM "ErrorLogTag" elt
          INNER JOIN "Tag" t
            ON t."id" = elt."tagId"
          WHERE elt."errorLogId" = el."id"
            AND t."tag_name" ILIKE ${searchKeyword}
            )
      )    
        ORDER BY el."updated_at" DESC
        LIMIT ${pagination.limit}
        OFFSET ${pagination.offset}`;

    const response = {
      status: "OK",
      errorlog: errorLogListData,
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
