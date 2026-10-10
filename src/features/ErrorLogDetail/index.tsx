"use client";

import { useGetFetcher } from "@/hooks/useFetch";
import { ErrorLogHeaderContent } from "./components/ErrorLogHeaderContent";
import { ErrorLogDetailsSection } from "./components/ErrorLogDetailsSection";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorLogFormValues } from "../ErrorLog-NewPosts/types/errorLogForm";
import { ErrorLogDetailResponse } from "@/types/api-response";

type Props = {
  errorLogId: string;
};

export const ErrorLogDetail = ({ errorLogId }: Props) => {
  const methods = useForm<ErrorLogFormValues>({
    defaultValues: {
      // defaultValuesで、フォームの初期を設定し、コンポーネントの初回レンダリング時を一度だけキャッシュ。
      title: "",
      status: "UNRESOLVED",
      tags: [],
      os: "",
      framework: "",
      framework_version: "",
      solution: "",
      cause: "",
      error_message: "",
      reference_url: "",
    },
  });
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
    <FormProvider {...methods}>
      <div className="mx-auto flex max-w-[800px] flex-col gap-10">
        <Link href="/errorLogList">
          <span className="text-xl text-[#1e90ff] ">← 一覧に戻る</span>
        </Link>
        <ErrorLogHeaderContent errorLogs={[data.detailErrorLog]} />
        <ErrorLogDetailsSection errorLogs={[data.detailErrorLog]} />
      </div>
    </FormProvider>
  );
};
