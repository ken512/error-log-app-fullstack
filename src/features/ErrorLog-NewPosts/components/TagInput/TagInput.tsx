"use client";

import type { KeyboardEvent } from "react";
import { useAtom } from "jotai";
import { useFormContext } from "react-hook-form";

import { tagInputAtom } from "@/stores/errorLogFormAtom";
import type { ErrorLogFormValues } from "../../types/errorLogForm";

const MAX_TAGS = 5;

export const TagInput = () => {
  const [tagInput, setTagInput] = useAtom(tagInputAtom);

  const { watch, setValue } = useFormContext<ErrorLogFormValues>();

  const tags = watch("tags") ?? [];

  const handleTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();

    const newTag = tagInput.trim();

    // 重複は追加しない。
    if (!newTag) return;
    // 上限5個まで・
    if (tags.length >= MAX_TAGS) return;

    if (tags.includes(newTag)) {
      return setTagInput("");
    }

    setValue("tags", [...tags, newTag], {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTagInput("");
  };

  const handleRemoveTag = (targetTag: string) => {
    const nextTags = tags.filter((tag) => tag !== targetTag);

    setValue("tags", nextTags, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <label htmlFor="tag" className="text-xl font-bold">
        技術タグ
      </label>

      {tags.length >= MAX_TAGS && (
        <p className="text-red-500">タグの追加は上限5個までです。</p>
      )}

      <input
        id="tag"
        type="text"
        value={tagInput}
        disabled={tags.length >= MAX_TAGS}
        placeholder="TypeScript"
        onChange={(event) => setTagInput(event.target.value)}
        onKeyDown={handleTagKeyDown}
        className="rounded-md border-none bg-[#222222] px-2 py-4"
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-blue-800 px-4 py-3 text-white"
          >
            {tag}

            <button
              type="button"
              aria-label={`${tag}を削除`}
              onClick={() => handleRemoveTag(tag)}
              className="pl-3"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};
