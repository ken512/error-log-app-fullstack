import { api } from "@/utils/api";

// APIへリクエストをする通常の非同期関数

// GET: データを取得
export const getFetcher = async <TResponse>(path: string): Promise<TResponse> => {
  const res = await api.get<TResponse>(path);

  return res.data;
};

// POST: 登録データを送り、レスポンスを受け取る
export const postFetcher = async <TRequest,TResponse>(path: string, data: TRequest): Promise<TResponse> => {
  const res = await api.post<TResponse>(path, data);

  return res.data;
};


// PUT: 更新データを送り、レスポンスで受け取る
export const putFetcher = async <TRequest, TResponse>(path: string, data: TRequest): Promise<TResponse> => {
  const res = await api.put<TResponse>(path, data);

  return res.data;
};

// DELETE: URLで削除対象を指定し、レスポンスで受け取
export const deleteFetcher = async <TResponse>(path: string): Promise<TResponse> => {
  const res = await api.delete<TResponse>(path);

  return res.data;
}