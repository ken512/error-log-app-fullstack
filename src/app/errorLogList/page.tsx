"use client";

import { ErrorLogList } from "@/features/ErrorLogList";
import { SearchInput } from "@/features/ErrorLogList/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { searchKeywordAtom } from "@/features/ErrorLogList/components/SearchInput";
import { buildErrorLogListPath } from "@/utils/buildErrorLogListPath";
import { ErrorLogListResponse } from "@/types/api-response";
import { useGetFetcher } from "@/hooks/useFetch";
import { useAtom, useAtomValue } from "jotai";
import { errorLogPageAtom } from "@/stores/errorLogPageAtom";
import { Pagination } from "@/features/ErrorLogList/components/Pagination";
import { ErrorLogSummaryCards } from "@/features/ErrorLogList/components/ErrorLogSummary";

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

      {isLoading ? (
        <p>読み込み中...⚙️</p>
      ) : error ? (
        <p className="text-red-500">データ取得に失敗しました。</p>
      ) : !data ? (
        <p>データが存在しません。📝</p>
      ) : (
        <>
          <ErrorLogSummaryCards summary={data.summary} />
      <SearchInput />
      <h2 className="text-left text-2xl font-bold">最新のログ</h2>
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
