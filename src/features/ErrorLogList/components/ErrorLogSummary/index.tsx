import { ErrorLogSummary } from "@/types/errorLog.type";

type ErrorLogSummaryCardProps = {
  summary: ErrorLogSummary;
};

export const ErrorLogSummaryCards = ({ summary }: ErrorLogSummaryCardProps) => {
  return (
    <section className="grid w-full grid-cols-3 gap-4 text-left">
      <div className="min-h-[90px] rounded-lg bg-black p-3">
        <p className="text-sm font-bold">
          記録したログ
        </p>

        <p className="text-2xl font-bold">
          {summary.total}
        </p>
      </div>

      <div className="min-h-[90px] rounded-lg bg-black p-3">
        <p className="text-sm font-bold">
          解決済み
        </p>

        <p className="text-2xl font-bold text-green-500">
          {summary.resolved}
        </p>
      </div>

      <div className="min-h-[90px] rounded-lg bg-black p-3">
        <p className="text-sm font-bold">
          未解決
        </p>

        <p className="text-2xl font-bold">
          {summary.unresolved}
        </p>
      </div>
    </section>
  );
};
