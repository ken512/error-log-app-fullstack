"use client";

import Link from "next/link";
import { useGetFetcher } from "@/hooks/useFetch";
import { ErrorLogListResponse } from "@/types/api-response";
import { formatDate } from "@/utils/formatDate";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";
import { useDebounce } from "@/hooks/useDebounce";
import { searchKeywordAtom } from "@/components/SearchInput";
import { buildErrorLogListPath } from "@/utils/buildErrorLogListPath";
import { useAtomValue } from "jotai";

export const ErrorLogList = () => {
  const keyword = useAtomValue(searchKeywordAtom);
  const debouncedKeyword = useDebounce(keyword, 300);

  const searchPath = buildErrorLogListPath(debouncedKeyword);

  const { data, error, isLoading, isFetching } =
    useGetFetcher<ErrorLogListResponse>(
      ["errorLogs", debouncedKeyword],
      searchPath,
    );

  const { formatStatusJa } = useResolutionStatus();

  return (
    <div className="mx-auto flex max-w-[800px] flex-col gap-10">
      <h2 className="text-left text-2xl font-bold">最新のログ</h2>

      {isLoading ? (
        <p>読み込み中...⚙️</p>
      ) : error ? (
        <p className="text-red-500">データ取得に失敗しました。</p>
      ) : !data ? (
        <p>データが存在しません。📝</p>
      ) : data.errorlog.length === 0 ? (
        <p>検索結果がありません。</p>
      ) : (
        data.errorlog.map((errorLog) => (
          <div className="w-full" key={errorLog.id}>
            <ul className="rounded-xl bg-[#333333] px-5 py-5">
              <li>
                <Link
                  href={`/errorLog/${errorLog.id}`}
                  className="flex flex-col gap-10"
                >
                  <div className="flex justify-between">
                    <p className="text-sm">{errorLog.title}</p>

                    <p
                      className={`rounded-md px-2 py-1 text-sm ${
                        errorLog.status === "RESOLVED"
                          ? "bg-green-950 text-green-500"
                          : "bg-red-950 text-red-400"
                      }`}
                    >
                      {formatStatusJa(errorLog.status)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {errorLog.tags
                      .filter((tag) => tag.tag_name.trim() !== "")
                      .map((tag) => (
                        <p
                          key={tag.id}
                          className="rounded-md bg-blue-950 px-2 py-1 text-sm text-blue-400"
                        >
                          {tag.tag_name}
                        </p>
                      ))}

                    <p className="text-sm text-gray-200">
                      {formatDate({
                        date: errorLog.updated_at,
                      })}
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        ))
      )}
      {isFetching && !isLoading && <p>検索中...</p>}
    </div>
  );
};
