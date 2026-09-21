"use client";

import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";
import { ErrorLogListItem} from "@/types/errorLog.type";

type ErrorLogListProps = {
  errorLogs: ErrorLogListItem[];
};

export const ErrorLogList = ({errorLogs}: ErrorLogListProps) => {
  
  if(errorLogs.length === 0) return <p>検索結果がありません。</p>;

  const { formatStatusJa } = useResolutionStatus();

  return (
    <>
        {errorLogs.map((errorLog) => (
          <div className="w-full" key={errorLog.id}>
            <ul className="rounded-xl bg-[#333333] px-5 py-5">
              <li>
                <Link
                  href={`/errorLog/${errorLog.id}`}
                  className="flex flex-col gap-10"
                >
                  <div className="flex justify-between">
                    <p className="text-sm">{errorLog.title}</p>

                    <p
                      className={`rounded-md px-2 py-1 text-sm ${
                        errorLog.status === "RESOLVED"
                          ? "bg-green-950 text-green-500"
                          : "bg-red-950 text-red-400"
                      }`}
                    >
                      {formatStatusJa(errorLog.status)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {errorLog.tags
                      .filter((tag) => tag.tag_name.trim() !== "")
                      .map((tag) => (
                        <p
                          key={tag.id}
                          className="rounded-md bg-blue-950 px-2 py-1 text-sm text-blue-400"
                        >
                          {tag.tag_name}
                        </p>
                      ))}

                    <p className="text-sm text-gray-200">
                      {formatDate({
                        date: errorLog.updated_at,
                      })}
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        ))}
    </>
  );
};
