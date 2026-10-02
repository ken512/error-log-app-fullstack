"use client";

import { useSetAtom } from "jotai";
import { tagInputAtom, errorLogTagsAtom } from "@/stores/errorLogFormAtom";
import { useFormContext } from "react-hook-form";
import { ErrorLogFormValues } from "@/features/ErrorLog-NewPosts/types/errorLogForm";
import { Button } from "../Button/Button";

export const FormResetButton = () => {
  const { reset } = useFormContext<ErrorLogFormValues>();
  const setTagInput = useSetAtom(tagInputAtom);
  const setTag = useSetAtom(errorLogTagsAtom);

  const handleReset = () => {
    // 利用側で型を明示してリセットを実行。
    reset();

    // タグのInput入力をクリア
    setTagInput("");

    // 追加済みのタグをを空
    setTag([]);
  };

  return (
    <Button type="button" onClick={handleReset} className="border-none text-black bg-white">
      クリア
    </Button>
  );
};
