// API・DB取得に必要なページ情報の計算

type CalculatePaginationParams = {
  requestedPage: number;
  totalCount: number;
  pageSize: number;
  maxItems: number;
};

export const calculatePagination = ({
  requestedPage,
  totalCount,
  pageSize,
  maxItems,
}: CalculatePaginationParams) => {
  // ページネーションの対象件数の上限以内にする
  const total = Math.min(totalCount, maxItems);

  // 総ページ数
  const totalPages = Math.ceil(total / pageSize);

  // 不正なページ番号は1ページ目にする
  const validPage =
    Number.isInteger(requestedPage) && requestedPage >= 1 ? requestedPage : 1;

  // 最大ページ数を超えないようにする
  const page = totalPages > 0 ? Math.min(validPage, totalPages) : 1;
  
  // DBで読み飛ばす件数
  const offset = (page - 1) * pageSize;

  // 最終ページで最大件数を超えないようにする
  const remaining = Math.max(total - offset, 0);
  const limit = Math.min(pageSize, remaining);

  // UIに表示する開始・終了位置
  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + limit, total);

  return {
    page,
    limit,
    offset,
    total,
    totalPages,
    start,
    end
  };
};

// calculatePagination関数を返り値の型
export type PaginationData = ReturnType<typeof calculatePagination>;