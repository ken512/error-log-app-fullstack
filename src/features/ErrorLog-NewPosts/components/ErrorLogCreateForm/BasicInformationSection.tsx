"use client";

import { useFormContext } from "react-hook-form";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";
import { TagInput } from "../TagInput/TagInput";
import { Button } from "@/components/Button/Button";
import { ResolutionStatus } from "@/generated/prisma";
import { ErrorLogFormValues } from "../../types/errorLogForm";


const STATUS_OPTIONS: ResolutionStatus[] = ["RESOLVED", "UNRESOLVED"] as const;

export const BasicInformationSection = () => {
  const { register, watch, setValue } = useFormContext<ErrorLogFormValues>();
  const { formatStatusJa } = useResolutionStatus();

  const currentStatus = watch("status");

  return (
    <section className="flex flex-col gap-5 font-bold border-none rounded-2xl px-10 py-5 bg-[#333333]">
      <h1 className="text-2xl">基本情報</h1>
      <p className="text-xl">タイトル</p>
      <input type="text" placeholder="TypeError: map is not a function" className="px-2 py-4 border-none rounded-md bg-[#222222]" {...register("title")} />

      <p className="text-xl">現在の状態</p>

      <div className="grid grid-cols-2 gap-3 ">
        {STATUS_OPTIONS.map((status) => {
          const isSelected = currentStatus === status;

          return (
            <Button
              key={status}
              type="button"
              aria-pressed={isSelected}
              className={`w-full rounded-md border px-5 py-3 ${isSelected ? status === "RESOLVED" ? "border bg-green-950 text-green-500" : "border bg-red-950 text-red-400" : "border-gray-500 bg-transparent text-white"}`}
              onClick={() => setValue("status", status)}
            >
              {formatStatusJa(status)}
            </Button>
          );
        })}
      </div>

      <TagInput />
    </section>
  );
};
