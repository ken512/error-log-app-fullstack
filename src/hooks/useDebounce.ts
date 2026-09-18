

import { useEffect, useState } from "react";

// 検索文字が入力されるたびにAPIリクエストやDB操作が実行されるのを防ぐためのカスタムフック
// デバウンスの処理で、特定の処理が高頻度で呼び出されるのを防ぐ。
export const useDebounce = <T>(value: T, delay = 300): T => {

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delayミリ秒後に最新の値を反映する
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // delayが経過する前に値が変わったら、前回の更新予約を消す。
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};