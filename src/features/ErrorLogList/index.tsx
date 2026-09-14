"use client";

import Link from "next/link";
import { useGetFetcher } from "@/hooks/useFetch";
import { ErrorLogListResponse } from "@/types/api-response";
import { formatDate } from "@/utils/formatDate";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";

export const ErrorLogList = () => {
  const { data, error, isLoading } = useGetFetcher<ErrorLogListResponse>(
    ["errorLogs"],
    "/public/errorlog-list",
  );

  if (isLoading) return <div>読み込み中...⚙️</div>;
  if (error)
    return <div className="text-red-500">データ取得に失敗しました。</div>;
  if (!data) return <div>データが存在しません。📝</div>;

  const { formatJa } = useResolutionStatus();

  return (
    <div className="flex flex-col gap-10 max-w-[800px] mx-auto">
      <h2 className="text-left font-bold text-2xl">最新のログ</h2>
      {data?.errorlog.map((errorlog) => (
        <div className="w-full" key={errorlog.id}>
          <ul className="border-none px-[20px] py-[20px] bg-[#333333] rounded-xl">
            <Link href={`errorLog/${errorlog.id}`}>
              <li className="flex flex-col gap-10">
                <div className="flex justify-between">
                  <p className="text-sm">{errorlog.title}</p>
                  <p
                    className={`rounded-md px-2 py-1 text-sm ${
                      errorlog.status === "RESOLVED"
                        ? "bg-green-950 text-green-500"
                        : "bg-red-950 text-red-400"
                    }`}
                  >
                    {formatJa(errorlog.status)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {errorlog.tags
                    .filter((tag) => tag.tag_name.trim() !== "")
                    .map((tag) => (
                      <p
                        key={tag.id}
                        className="text-sm border-none px-2 py-1 rounded-md text-blue-400 bg-blue-950"
                      >
                        {tag.tag_name}
                      </p>
                    ))}
                  <p className="text-sm text-gray-200">
                    {formatDate({ date: errorlog.updated_at })}
                  </p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      ))}
    </div>
  );
};
