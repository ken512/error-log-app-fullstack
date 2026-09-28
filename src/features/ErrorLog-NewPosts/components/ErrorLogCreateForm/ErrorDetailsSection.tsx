"use client";

import { useFormContext } from "react-hook-form";
import { ErrorLogFormValues } from "../../types/errorLogForm";

export const ErrorDetailsSection = () => {
  const { register } = useFormContext<ErrorLogFormValues>();

  return (
    <section className="w-full flex flex-col gap-8 font-bold border-none rounded-2xl px-10 py-10 bg-[#333333]">
      <h1 className="text-2xl">エラー詳細</h1>

        <label htmlFor="error_message">エラーメッセージ</label>
        <textarea id="error_message" placeholder="TypeError:..." {...register("error_message")} className="border-none rounded-md px-2 py-3 bg-[#222222] min-h-[150px]"/>

        <label htmlFor="cause">原因</label>
        <textarea id="cause" placeholder="何が原因だったのか..." {...register("cause")} className="border-none rounded-md px-2 py-3 bg-[#222222] min-h-[150px]"/>

        <label htmlFor="solution">解決方法</label>
        <textarea id="solution" placeholder="最終的にどう対応したのか..." {...register("solution")} className="border-none rounded-md px-2 py-3 bg-[#222222] min-h-[150px]"/>

        <label htmlFor="url">参考URL</label>
        <input type="text" placeholder="https://qita.com/..." {...register("reference_url")} className="border-none rounded-md px-2 py-3 bg-[#222222]"/>

    </section>
  );
};
