
// 検索パスの共通関数
// 検索キーワード有無によって、APIへ送るURLを切り替えている。
export const buildErrorLogListPath = (keyword: string): string => {

  const trimmedKeyword = keyword.trim();
  // キーワードが空白の場合は、一覧取得APIへリクエスト
  if(!trimmedKeyword) return "/public/errorlog-list";

  // キーワードある場合は、キーワードをクエリパラメータへ変換し、検索条件付きのパスを返す
  const searchParams = new URLSearchParams({
    keyword: trimmedKeyword,
  });

  return `/public/errorlog-list?${searchParams.toString()}`;
};