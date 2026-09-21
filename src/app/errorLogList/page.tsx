"use client";

import { ErrorLogList } from "@/features/ErrorLogList";
import { SearchInput } from "@/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { searchKeywordAtom } from "@/components/SearchInput";
import { buildErrorLogListPath } from "@/utils/buildErrorLogListPath";
import { ErrorLogListResponse } from "@/types/api-response";
import { useGetFetcher } from "@/hooks/useFetch";
import { useAtom, useAtomValue } from "jotai";
import { errorLogPageAtom } from "@/stores/errorLogPageAtom";
import { Pagination } from "@/components/Pagination";

const ErrorLogListPage = () => {
  const [page, setPage] = useAtom(errorLogPageAtom);
  const keyword = useAtomValue(searchKeywordAtom);
  const debouncedKeyword = useDebounce(keyword, 300);

  const searchPath = buildErrorLogListPath(debouncedKeyword, page);

  const { data, error, isLoading, isFetching } =
    useGetFetcher<ErrorLogListResponse>(
      ["errorLogs", debouncedKeyword, page],
      searchPath,
    );

  return (
    <main className="mx-auto flex max-w-[800px] flex-col gap-10">
      <SearchInput />
      <h2 className="text-left text-2xl font-bold">最新のログ</h2>
      {isLoading ? (
        <p>読み込み中...⚙️</p>
      ) : error ? (
        <p className="text-red-500">データ取得に失敗しました。</p>
      ) : !data ? (
        <p>データが存在しません。📝</p>
      ) : (
        <>
          <ErrorLogList errorLogs={data.errorlog} />
          <Pagination
            pagination={data.pagination}
            onPrevious={() => {
              setPage((currentPage) => Math.max(currentPage - 1, 1));
            }}
            onNext={() => {
              setPage((currentPage) =>
                Math.min(currentPage + 1, data.pagination.totalPages),
              );
            }}
          />
        </>
      )}
      {isFetching && !isLoading && <p>検索中...</p>}
    </main>
  );
};

export default ErrorLogListPage;
