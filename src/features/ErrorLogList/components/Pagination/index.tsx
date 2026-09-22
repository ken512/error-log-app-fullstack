"use client";

import type { PaginationData } from "@/utils/ErrorLogList/calculatePagination";
import { generatePageNumber } from "@/utils/ErrorLogList/generatePageNumbers";

type PaginationProps = {
  pagination: PaginationData;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
};

export const Pagination = ({
  pagination,
  onPrevious,
  onNext,
  onPageChange,
}: PaginationProps) => {
  if (pagination.total === 0) {
    return null;
  }
    const pageNumbers = generatePageNumber({
    currentPage: pagination.page,
    totalPages: pagination.totalPages,
  });


  return (
    <div className="flex flex-col items-center gap-4 font-bold my-10">
      <p>
        全{pagination.total}件中 {pagination.start}〜{pagination.end}件表示
      </p>
      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={pagination.page <= 1}
          onClick={onPrevious}
          className=" hover:text-gray-400"
        >
          &lt; 前へ
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            area-current={pageNumber === pagination.page ? "page" : undefined}
            className={
              pageNumber === pagination.page
                ? "bg-blue-600 text-white hover:bg-blue-700 px-2 py-1 rounded-md"
                : "bg-gray-700 text-white hover:bg-gray-600 px-2 py-1 rounded-md"
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={pagination.page >= pagination.totalPages}
          onClick={onNext}
          className="hover:text-gray-400"
        >
          次へ &gt;
        </button>
        <span>
          {pagination.page} / {pagination.totalPages}
        </span>
      </div>
    </div>
  );
};
