import { ErrorLogDetail } from "@/types/errorLog.type";
import { formatDate } from "@/utils/formatDate";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";

type ErrorLogDetailsProps = {
  errorLogs: ErrorLogDetail[];
};

export const ErrorLogHeaderContent = ({ errorLogs }: ErrorLogDetailsProps) => {
  if (errorLogs.length === 0) return <p>データがありません。</p>;

  const { formatStatusJa } = useResolutionStatus();

  return (
    <>
      {errorLogs.map((errorLog) => (
        <div className="w-full" key={errorLog.id}>
          <div className="flex justify-between">
            <h1 className="text-3xl">{errorLog.title}</h1>
            <span
              className={`rounded-md px-2 py-1 text-sm ${
                errorLog.status === "RESOLVED"
                  ? "bg-green-950 text-green-500"
                  : "bg-red-950 text-red-400"
              }`}
            >
              {formatStatusJa(errorLog.status)}
            </span>
            <div className="flex items-center gap-2">
              {errorLog.tags
                .filter((tag) => tag.tag_name.trim() !== "")
                .map((tag) => (
                  <span>{tag.id}</span>
                ))}
              <span className="text-xl text-gray-200">
                {formatDate({ date: errorLog.updated_at })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
