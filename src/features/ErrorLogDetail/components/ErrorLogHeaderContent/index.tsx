"use client";

import { useFormContext } from "react-hook-form";

import { Button } from "@/components/Button/Button";
import { TagInput } from "@/features/ErrorLog-NewPosts/components/TagInput/TagInput";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";
import { formatDate } from "@/utils/formatDate";

import type { ErrorLogDetail } from "@/types/errorLog.type";
import type { ErrorLogFormValues } from "@/features/ErrorLog-NewPosts/types/errorLogForm";

type ErrorLogHeaderContentProps = {
  errorLogs: ErrorLogDetail[];
  isEditing: boolean;
};

const STATUS_OPTIONS: ErrorLogFormValues["status"][] = [
  "RESOLVED",
  "UNRESOLVED",
];

export const ErrorLogHeaderContent = ({
  errorLogs,
  isEditing,
}: ErrorLogHeaderContentProps) => {
  const { register, watch, setValue } =
    useFormContext<ErrorLogFormValues>();

  const { formatStatusJa } = useResolutionStatus();

  const currentStatus = watch("status");

  if (errorLogs.length === 0) {
    return <p>データがありません。</p>;
  }

  return (
    <section className="mt-16 w-full rounded-xl border-none bg-[#333333] px-5 py-5">
      {errorLogs.map((errorLog) => (
        <div
          key={errorLog.id}
          className="flex w-full flex-col gap-5"
        >
          {isEditing ? (
            // 編集中
            <div className="flex w-full flex-col gap-10">
              {/* タイトル */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-xl font-bold"
                >
                  タイトル
                </label>

                <input
                  id="title"
                  type="text"
                  {...register("title")}
                  className="w-full rounded-xl border-none bg-[#222222] px-5 py-5 font-bold"
                />
              </div>

              {/* ステータス */}
              <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">
                  現在の状態
                </p>

                <div className="grid grid-cols-2 gap-3">
                  {STATUS_OPTIONS.map((status) => {
                    const isSelected =
                      currentStatus === status;

                    return (
                      <Button
                        key={status}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setValue("status", status, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        className={`w-full rounded-md border px-5 py-3 ${
                          isSelected
                            ? status === "RESOLVED"
                              ? "border-green-500 bg-green-950 text-green-500"
                              : "border-red-400 bg-red-950 text-red-400"
                            : "border-gray-500 bg-transparent text-white"
                        }`}
                      >
                        {formatStatusJa(status)}
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* タグ編集 */}
              <TagInput />
            </div>
          ) : (
            // 通常表示
            <>
              {/* タイトル・ステータス */}
              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-xl font-bold">
                  {errorLog.title}
                </h1>

                <span
                  className={`shrink-0 rounded-md px-3 py-2 text-sm ${
                    errorLog.status === "RESOLVED"
                      ? "bg-green-950 text-green-500"
                      : "bg-red-950 text-red-400"
                  }`}
                >
                  {formatStatusJa(errorLog.status)}
                </span>
              </div>

              {/* タグ・更新日 */}
              <div className="flex flex-wrap items-center gap-2">
                {errorLog.tags
                  .filter(
                    (tag) =>
                      tag.tag_name.trim() !== "",
                  )
                  .map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-md bg-blue-950 px-4 py-2 text-sm text-blue-400"
                    >
                      {tag.tag_name}
                    </span>
                  ))}

                <span className="text-sm text-gray-200">
                  {formatDate({
                    date: errorLog.updated_at,
                  })}
                </span>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};