"use client";

import { tagInputAtom, errorLogTagsAtom } from "@/stores/errorLogFormAtom";
import { useAtom } from "jotai";
import { useFormContext } from "react-hook-form";
import { ErrorLogFormValues } from "../../types/errorLogForm";

export const TagInput = () => {
  const [tagInput, setTagInput] = useAtom(tagInputAtom);
  const [tags, setTags] = useAtom(errorLogTagsAtom);
  const { setValue } = useFormContext<ErrorLogFormValues>();
  const MAX_TAGS = 5;

  const handleTagTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    e.preventDefault(); // Enterによるフォーム送信とめる
    const newTag = tagInput.trim();

    // 空欄は追加しない。
    if (!newTag) {
      return;
    }
    // 上限５個まで。
    if (tags.length >= MAX_TAGS) {
      return;
    }

    // 重複は追加しない。
    if (tags.includes(newTag)) {
      setTagInput("");
      return;
    }

    const nextTags = [...tags, newTag];

    setTags(nextTags);

    setValue("tags", nextTags, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTagInput("");
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((currentTags) => currentTags.filter((tag) => tag !== targetTag));
  };

  return (
    <div className="flex flex-col gap-3 border-md">
      <label className="text-xl">技術タグ</label>
      {tags.length === 5 && (
        <p className="text-red-500">タグの追加は上限５個まで</p>
      )}
      <input
        id="tag"
        type="text"
        value={tagInput}
        placeholder="TypeScript Next.js React"
        onChange={(e) => setTagInput(e.target.value)}
        className="border-none rounded-md px-2 py-4 bg-[#222222]"
        onKeyDown={handleTagTagKeyDown}
      />

      <div className="mt-5 flex gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className=" border-none rounded-md px-4 py-3 bg-blue-800 text-white"
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
