
// 検索パスの共通関数
// 検索キーワードとページ番号からAPIリクエストパスを生成。
export const buildErrorLogListPath = (keyword: string, page: number): string => {

  const trimmedKeyword = keyword.trim();

   // ページ番号は常にクエリパラメータへ追加
  const searchParams = new URLSearchParams({
    page: String(page),
  });

  // キーワードがある場合だけ追加
  if(trimmedKeyword) {
    searchParams.set("keyword", trimmedKeyword);
  };

  return `/public/errorlog-list?${searchParams.toString()}`;
};