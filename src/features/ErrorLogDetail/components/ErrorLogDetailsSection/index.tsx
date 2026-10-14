import { ErrorLogDetail } from "@/types/errorLog.type";
import { useFormContext } from "react-hook-form";
import { Dialog } from "@/components/Dialog";
import { ErrorLogFormValues } from "@/features/ErrorLog-NewPosts/types/errorLogForm";

type ErrorLogDetailsSectionProps = {
  errorLogs: ErrorLogDetail[];
  isEditing: boolean;
};

export const ErrorLogDetailsSection = ({
  errorLogs,
  isEditing,
}: ErrorLogDetailsSectionProps) => {
  const { register } = useFormContext<ErrorLogFormValues>();

  return (
    <section>
      {errorLogs.map((errorLog) => (
        <div
          key={errorLog.id}
          className="w-full my-10 flex flex-col gap-5 text-left"
        >
          {/*発生環境*/}
          <div className="rounded-xl bg-[#333333] px-5 py-5">
            <label className="text-xl font-bold">発生環境</label>
            <div className="flex gap-3 mt-5">
              <div className="flex flex-col gap-2">
                <label className="text-md font-bold">OS</label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={errorLog.os ?? ""}
                    {...register("os")}
                    className="border-none rounded-xl bg-[#222222] px-5 py-3 font-bold"
                  />
                ) : (
                  <span className="border-none rounded-xl bg-[#222222] px-5 py-3 font-bold">
                    {errorLog.os ?? ""}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-md font-bold">フレームワーク</label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={errorLog.framework ?? ""}
                    {...register("framework")}
                    className="border-none rounded-xl bg-[#222222] px-5 py-3 font-bold"
                  />
                ) : (
                  <span className="border-none rounded-xl bg-[#222222] px-5 py-3 font-bold">
                    {errorLog.framework ?? ""}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-md font-bold">
                  フレームワークVer.
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={errorLog.framework_version ?? ""}
                    {...register("framework_version")}
                    className="border-none rounded-xl bg-[#222222] px-5 py-3 font-bold"
                  />
                ) : (
                  <span className="border-none rounded-xl bg-[#222222] px-5 py-3 font-bold">
                    {errorLog.framework_version ?? ""}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/*エラーメッセージ*/}
          <div className="rounded-xl bg-[#333333] px-5 py-5">
            <label className="text-xl font-bold">エラーメッセージ</label>
            <div className="mt-5">
              {isEditing ? (
                <textarea
                  {...register("error_message")}
                  className="min-h-32 w-full resize-y rounded-xl bg-[#222222] px-3 py-3 font-bold border-l-4 border-l-[#ff6666] text-[#ff6666]"
                />
              ) : (
                <pre className="block w-full text-md whitespace-pre-wrap wrap-break-word rounded-xl bg-[#222222] px-3 py-3 font-bold border-l-4 border-l-[#ff6666] text-[#ff6666]">
                  {errorLog.error_message}
                </pre>
              )}
            </div>
          </div>

          {/*原因*/}
          <div className="rounded-xl bg-[#333333] px-5 py-5">
            <label className="text-xl font-bold">原因</label>
            <div className="mt-5">
              {isEditing ? (
                <textarea
                  {...register("cause")}
                  className="min-h-32 w-full resize-y text-md font-bold rounded-xl bg-[#222222] px-3 py-3"
                />
              ) : (
                <pre className="text-md font-bold rounded-xl block w-full bg-[#222222] px-3 py-3">
                  {errorLog.cause}
                </pre>
              )}
            </div>
          </div>

          {/*解決方法*/}
          <div className="rounded-xl bg-[#333333] px-5 py-5">
            <label className="text-xl font-bold">解決方法</label>
            <div className="mt-5">
              {isEditing ? (
                <textarea
                  {...register("solution")}
                  className="text-md font-bold rounded-xl block w-full bg-[#222222] px-3 py-3"
                />
              ) : (
                <pre className="text-md font-bold rounded-xl block w-full bg-[#222222] px-3 py-3">
                  {errorLog.solution}
                </pre>
              )}
            </div>
          </div>

          {/*参考URL*/}
          <div className="rounded-xl bg-[#333333] px-5 py-5">
            <label className="text-xl font-bold">参考URL</label>
            <div className="mt-5">
              {isEditing ? (
                <input
                  defaultValue={errorLog.reference_url ?? ""}
                  type="url"
                  className="block w-full  rounded-xl text-[#1e90ff] font-bold border-none bg-[#222222] px-5 py-3"
                />
              ) : (
                <span className="block w-full rounded-xl text-[#1e90ff] font-bold border-none bg-[#222222] px-3 py-3">
                  {errorLog.reference_url ?? ""}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};
