import { ErrorLogSummary } from "@/types/errorLog.type";

type ErrorLogSummaryCardProps = {
  summary: ErrorLogSummary;
};

export const ErrorLogSummaryCards = ({ summary }: ErrorLogSummaryCardProps) => {
  return (
    <section className="flex items-center gap-4 text-left max-w-[120px] font-bold m-10">
      <div className="border rounded-md px-1 py-3 bg-black">
        <p>記録したログ</p>
        <p>{summary.total}件</p>
      </div>

      <div className="border rounded-md px-1 py-3 bg-black">
        <p>解決済み</p>
        <p className="text-green-400">{summary.resolved}件</p>
      </div>

      <div className="border rounded-md px-1 py-3 bg-black">
        <p>未解決</p>
        <p>{summary.unresolved}件</p>
      </div>
    </section>
  );
};
