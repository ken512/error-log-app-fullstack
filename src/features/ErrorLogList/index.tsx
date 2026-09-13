"use client";

import Link from "next/link";
import { useGetFetcher } from "@/hooks/useFetch";
import { ErrorLogListResponse } from "@/types/api-response";
import { formatDate } from "@/utils/formatDate";

export const ErrorLogList = () => {
  const { data, error, isLoading } = useGetFetcher<ErrorLogListResponse>(
    ["errorLogs"],
    "/public/errorlog-list",
  );

  if (isLoading) return <div>読み込み中...⚙️</div>;
  if (error)
    return <div className="text-red-500">データ取得に失敗しました。</div>;
  if (!data) return <div>データが存在しません。📝</div>;

  return (
    <div className="flex flex-col mx-auto">
      <label>最新のログ</label>
      {data?.errorlog.map((errorlog) => (
        <div className="" key={errorlog.id}>
          <ul className="border-none px-[20px] py-[20px] mx-[200px] mt-[50px] bg-[#333333] rounded-xl">
            <Link href={`errorLog/${errorlog.id}`}>
              <li>
                <p>{errorlog.title}</p>
                <p>{errorlog.status}</p>
                <div className="flex gap-2">
                  {errorlog.tags.map((tag) => (
                      <p key={tag.id}>{tag.tag_name}</p>
                  ))}
                  <p>{formatDate({date: errorlog.updated_at})}</p>
                </div>
              </li>
            </Link>
          </ul>
        </div>
      ))}
    </div>
  );
};
