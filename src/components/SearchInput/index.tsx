"use client";

// 検査文字の入力・状態管理
import { atom, useAtom } from "jotai";

export const searchKeywordAtom = atom<string>("");

export const SearchInput = () => {
  const [keyword, setKeyword] = useAtom(searchKeywordAtom);

  return (
    <div>
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="エラーログを検索"
        className="border p-2 rounded-md"
      />
    </div>
  );
};
