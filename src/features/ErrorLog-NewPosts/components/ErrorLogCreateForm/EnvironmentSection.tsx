"use client";

import { useFormContext } from "react-hook-form";
import { ErrorLogFormValues } from "../../types/errorLogForm";

export const EnvironmentSection = () => {
  const { register } = useFormContext<ErrorLogFormValues>();

  return (
    <section className="w-full flex flex-col gap-8 font-bold border-none rounded-2xl px-10 py-10 bg-[#333333]">
      <h1 className="text-2xl">発生環境</h1>

      <div className="w-full grid grid-cols-2 gap-5 justify-center items-center">
        <div className="flex flex-col gap-2">
          <label className="text-xl">OS</label>
          <input
            type="text"
            className="px-2 py-4 border-none rounded-md bg-[#222222]"
            placeholder="MacOS"
            {...register("os")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">フレームワーク</label>
          <input
            type="text"
            className="px-2 py-4 border-none rounded-md bg-[#222222]"
            placeholder="Next.js"
            {...register("framework")}
          />
        </div>
        
      </div>
      <span className="text-xl">フレームワークバージョン</span>
      <input
        type="text"
        className="px-2 py-4 border-none rounded-md bg-[#222222]"
        placeholder="Next.js 15"
        {...register("framework_version")}
      />
    </section>
  );
};
