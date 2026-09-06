import { api } from "@/utils/api";

// APIへリクエストをする通常の非同期関数
// GETリクエストを実行して、レスポンスのデータを返す通常の非同期関数
export const fetcher = async <T>(path: string): Promise<T> => {
  const res = await api.get<T>(path);

  return res.data;
};
