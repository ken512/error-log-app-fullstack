import { useQuery, type QueryKey } from '@tanstack/react-query';
import { getFetcher, postFetcher, putFetcher, deleteFetcher } from '@/utils/fetcher';
import { useMutation } from '@tanstack/react-query';

// fetcherをTanstack Queryから実行し、通信状態やキャッシュを管理するカスタムフック。

/*
queryKey: 取得データを識別・キャッシュするため
queryFn: データを取得する関数
*/
export const useGetFetcher = <TResponse>(queryKey: QueryKey, path: string) => {
  return useQuery<TResponse>({
    queryKey,
    queryFn: () => getFetcher<TResponse>(path),
  });
};

// POSTメソッドを、Tanstack Queryから実行
export const usePost = <TRequest, TResponse>(path: string) => {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: (data) => postFetcher<TRequest, TResponse>(path, data),
  });
};

// PUTメソッドを、Tanstack Queryから実行
export const usePut = <TRequest, TResponse>(path: string) => {
  return useMutation<TResponse, Error, TRequest>({
    mutationFn: (data) => putFetcher<TRequest, TResponse>(path, data),
  });
};

// DELETEメソッドを、Tanstack Queryから実行
export const useDelete = <TResponse>(path: string) => {
  return useMutation<TResponse, Error, void>({
    mutationFn: () => deleteFetcher<TResponse>(path),
  });
};