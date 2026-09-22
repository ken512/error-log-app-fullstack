
type GeneratePageNumbersProps = {
  currentPage: number; // 現在表示しているページ
  totalPages: number; // 全ページ数
  maxVisiblePages?: number; // 表示するページ番号の最大数
};

// 現在のページを中央付近に配置しながら、1ページ目未満・最終ページ超過を防ぎ、最大5個の連続したページ番号を生成する関数
export const generatePageNumber = ({currentPage, totalPages, maxVisiblePages = 5}: GeneratePageNumbersProps): number[] => {
  // 最大5個表示する場合、現在ページの前に2個、後ろに2個
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  // 開始ページから最大5個表示した場合の、最後のページを計算
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  startPage = Math.max(1, endPage - maxVisiblePages + 1);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
};
