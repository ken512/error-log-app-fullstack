import { useQuery, type QueryKey } from '@tanstack/react-query';
import { fetcher } from '@/utils/fetcher';

// fetcherをTanstack Queryから実行し、通信状態やキャッシュを管理するカスタムフック。

/*
queryKey: 取得データを識別・キャッシュするため
queryFn: データを取得する関数
*/
export const useFetcher = <T>(queryKey: QueryKey, path: string) => {
  return useQuery<T>({
    queryKey,
    queryFn: () => fetcher<T>(path),
  });
};


