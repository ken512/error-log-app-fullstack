"use client";

import { useGetFetcher } from "@/hooks/useFetch";
import { ErrorLogHeaderContent } from "./components/ErrorLogHeaderContent";
import { ErrorLogDetailsSection } from "./components/ErrorLogDetailsSection";
import { ErrorLogActionsSection } from "./components/ErrorLogActionsSection";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { ErrorLogFormValues } from "../ErrorLog-NewPosts/types/errorLogForm";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { usePut } from "@/hooks/useFetch";
import { useDelete } from "@/hooks/useFetch";
import {
  DeleteErrorLogResponse,
  ErrorLogDetailResponse,
  UpdateErrorLogResponse,
} from "@/types/api-response";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog } from "@/components/Dialog";
import { useEffect, useState } from "react";
import { useSetAtom } from "jotai";
import { dialogActionsAtom } from "@/stores/dialogActionsAtom";

type Props = {
  errorLogId: string;
};

export const ErrorLogDetail = ({ errorLogId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  // キャッシュの保管庫のインスタンスを定義。
  const queryClient = useQueryClient();

  const dispatch = useSetAtom(dialogActionsAtom);

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

  // データ取得fetch
  const { data: detailData, error } = useGetFetcher<ErrorLogDetailResponse>(
    ["errorLogs", errorLogId],
    `/public/errorlog/${errorLogId}`,
  );

  const { reset } = methods;

  // apiから非同期で取得したデータ(detailData)が届いたタイミングで、useEffectを実行
  // resetを使って、取得データをReact Hook Formが管理するフォーム全体の初期値として返す。
  // resetは、取得データをフォーム全体の値を一括設定。
  useEffect(() => {
    if (!detailData) return;

    const errorLog = detailData.detailErrorLog;

    reset({
      title: errorLog.title ?? "",
      status: errorLog.status ?? "UNRESOLVED",
      os: errorLog.os ?? "",
      framework: errorLog.framework ?? "",
      framework_version: errorLog.framework_version ?? "",
      error_message: errorLog.error_message ?? "",
      cause: errorLog.cause ?? "",
      solution: errorLog.solution ?? "",
      reference_url: errorLog.reference_url ?? "",
      tags: errorLog.tags.map((tag) => tag.tag_name),
    });
  }, [detailData, reset]);

  // データ更新
  const { mutate: updateErrorLog, isPending: isUpdating } = usePut<
    ErrorLogFormValues,
    UpdateErrorLogResponse
  >(`/admin/errorlog/${errorLogId}`);

  // データ削除
  const { mutate: deleteErrorLog, isPending: isDeleting } =
    useDelete<DeleteErrorLogResponse>(`/admin/errorlog/${errorLogId}`);

  if (error) {
    return <p className="text-red-500">データ取得に失敗しました。</p>;
  }
  if (!detailData) {
    return <p>データがありません。</p>;
  }

  // 編集するボタン
  const handleStartEdit = () => {
    setIsEditing(true);
  };
  // キャンセルボタン
  const handleCancel = () => {
    methods.reset();
    setIsEditing(false);
  };

  // 保存成功後
  const handleEdit = (formValues: ErrorLogFormValues) => {
    updateErrorLog(formValues, {
      onSuccess: (response) => {
        toast.success(response.message);
        dispatch("close");
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ["errorLog", errorLogId] });
      },

      onError: () => {
        toast.error("エラーログの更新に失敗しました。");
      },
    });
  };

  // 削除ボタン
  const handleDelete = () => {
    deleteErrorLog(undefined, {
      onSuccess: (response) => {
        toast.success(response.message);
        dispatch("close");
        router.push("/errorLogList");
      },
      onError: () => {
        toast.error("エラーログの削除に失敗しました。");
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Toaster position="top-center" />
      <form onSubmit={methods.handleSubmit(handleEdit)}>
        <div className="mx-auto flex max-w-[800px] flex-col gap-10">
          <Link href="/errorLogList">
            <span className="text-xl text-[#1e90ff] ">← 一覧に戻る</span>
          </Link>
          <ErrorLogHeaderContent
            errorLogs={[detailData.detailErrorLog]}
            isEditing={isEditing}
          />
          <ErrorLogDetailsSection
            errorLogs={[detailData.detailErrorLog]}
            isEditing={isEditing}
          />
          <ErrorLogActionsSection
            isEditing={isEditing}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
            onEdit={handleStartEdit}
            onCancel={handleCancel}
          />
        </div>
      </form>
      <Dialog
        onConfirm={isEditing ? methods.handleSubmit(handleEdit) : handleDelete}
        actions={isEditing ? "update" : "delete"}
        isPending={isEditing ? isUpdating : isDeleting}
      />
    </FormProvider> 
  );
};
