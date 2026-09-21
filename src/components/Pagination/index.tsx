"use client";

import type { PaginationData } from "@/utils/calculatePagination";

type PaginationProps = {
  pagination: PaginationData;
  onPrevious: () => void;
  onNext: () => void;
};

export const Pagination = ({
  pagination,
  onPrevious,
  onNext,
}: PaginationProps) => {
  if (pagination.total === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-4 font-bold my-16">
      <p>
        全{pagination.total}件中{" "}
        {pagination.start}〜{pagination.end}件表示
        </p>
      <div className="flex items-center gap-4">
        <button type="button" disabled={pagination.page <= 1} onClick={onPrevious} className=" hover:text-gray-400">&lt; 前へ</button>

        <span>{pagination.page}/{pagination.totalPages}</span>
        <button type="button" disabled={pagination.page >= pagination.totalPages} onClick={onNext} className="hover:text-gray-400">次へ &gt;</button>
      </div>
    </div>
  );
};
