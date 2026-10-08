"use client";

import { useGetFetcher } from "@/hooks/useFetch";
import { ErrorLogHeaderContent } from "./components/ErrorLogHeaderContent";
import Link from "next/link";
import { ErrorLogDetailResponse } from "@/types/api-response";

type Props = {
  errorLogId: string;
};

export const ErrorLogDetail = ({ errorLogId }: Props) => {
  const { data, error } = useGetFetcher<ErrorLogDetailResponse>(
    ["errorLogs", errorLogId],
    `/public/errorlog/${errorLogId}`,
  );

  if (error) {
    return <p className="text-red-500">データ取得に失敗しました。</p>;
  }
  if (!data) {
    return <p>データがありません。</p>;
  }

  return (
    <main className="mx-auto flex max-w-[800px] flex-col gap-10">
      <Link href="/errorLogList">
      <span className="text-xl text-[#1e90ff] ">← 一覧に戻る</span>
      <ErrorLogHeaderContent errorLogs={[data.detailErrorLog]} />
      </Link>
    </main>
  );
};
