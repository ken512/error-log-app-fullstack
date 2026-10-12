import { ErrorLogDetail } from "@/types/errorLog.type";
import { formatDate } from "@/utils/formatDate";
import { useResolutionStatus } from "@/hooks/useResolutionStatus";
import { useFormContext } from "react-hook-form";
import { STATUS_OPTIONS } from "@/features/ErrorLog-NewPosts/components/ErrorLogCreateForm/BasicInformationSection";
import { ErrorLogFormValues } from "@/features/ErrorLog-NewPosts/types/errorLogForm";
import { Button } from "@/components/Button/Button";
import { TagInput } from "@/features/ErrorLog-NewPosts/components/TagInput/TagInput";
type ErrorLogDetailsProps = {
  errorLogs: ErrorLogDetail[];
  isEditing: boolean;
};

export const ErrorLogHeaderContent = ({
  errorLogs,
  isEditing,
}: ErrorLogDetailsProps) => {
  const { formatStatusJa } = useResolutionStatus();
  const { register, watch, setValue } = useFormContext<ErrorLogFormValues>();
  const currentStatus = watch("status");

  return (
    <section>
      {errorLogs.map((errorLog) => (
        <div className="w-full mt-16" key={errorLog.id}>
          <div className="flex justify-between gap-5 rounded-xl bg-[#333333] px-5 py-5">
            { isEditing ? (
            <TagInput />
            ) : (
            <h1 className="text-3xl">{errorLog.title}</h1>
            )}
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3 ">
                {STATUS_OPTIONS.map((status) => {
                  const isSelected = currentStatus === status;
                  return (
                    <Button
                      key={status}
                      type="button"
                      aria-pressed={isSelected}
                      className={`w-full rounded-md border px-5 py-3 ${isSelected ? (status === "RESOLVED" ? "border bg-green-950 text-green-500" : "border bg-red-950 text-red-400") : "border-gray-500 bg-transparent text-white"}`}
                      onClick={() => setValue("status", status)}
                    >
                      {formatStatusJa(status)}
                    </Button>
                  );
                })}
              </div>
            ) : (
              <span
                className={`rounded-md px-2 py-1 text-sm ${
                  errorLog.status === "RESOLVED"
                    ? "bg-green-950 text-green-500"
                    : "bg-red-950 text-red-400"
                }`}
              >
                {formatStatusJa(errorLog.status)}
              </span>
            )}
          </div>
        <div className="flex items-center gap-2 mt-5">
          { isEditing ? ( 
            <div className="w-[350px] rounded-xl bg-[#333333] px-5 py-5">
            <input type="text" className="border-none rounded-xl bg-[#222222] px-5 py-5 font-bold" {...register("tags")} />
            </div>
          ) : (
            <>
            {errorLog.tags
              .filter((tag) => tag.tag_name.trim() !== "")
              .map((tag) => (
                <p
                  className="rounded-md bg-blue-950 px-4 py-2 text-sm text-blue-400"
                  key={tag.id}
                >
                  {tag.tag_name}
                </p>
              ))}
              </>
              )}
            <span className="text-sm text-gray-200">
              {formatDate({ date: errorLog.updated_at })}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};
