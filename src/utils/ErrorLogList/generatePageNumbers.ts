
type GeneratePageNumbersProps = {
  currentPage: number;
  totalPages: number;
  maxVisiblePages?: number;
};



export const generatePageNumber = ({currentPage, totalPages, maxVisiblePages = 5}: GeneratePageNumbersProps): number[] => {
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  startPage = Math.max(1, endPage - maxVisiblePages + 1);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
};
