import { ErrorLogDetail } from "@/types/errorLog.type";

type ErrorLogDetailsSectionProps = {
  errorLogs: ErrorLogDetail[];
};

export const ErrorLogDetailsSection = ({errorLogs}: ErrorLogDetailsSectionProps) => {

  // TODO: error.tsxでエラーページを表示させる。
  if( errorLogs.length === 0) {
    return <p>データがありません。</p>;
  };

  return (
    <>
    { errorLogs.map((errorLog) => (
      <div key={errorLog.id} className="w-full mt-10 gap-5">
        {/*発生環境*/}
        <div className="rounded-xl bg-[#333333]">
          <p className="text-xl text-gray-400 ">発生環境</p>
          <div className="rounded-xl #222222 px-3 py-3 font-bold">{errorLog.framework}</div>
          <div className="rounded-xl #222222 px-3 py-3 font-bold">{errorLog.framework_version}</div>
          <div className="rounded-xl #222222 px-3 py-3 font-bold">{errorLog.os}</div>
        </div>

        {/*エラーメッセージ*/}
        <div className="rounded-xl bg-[#333333] px-5 py-5">
          <span className="text-xl text-gray-400">エラーメッセージ</span>
            <span className={`rounded-xl #222222 px-3 py-3 font-bold ${ errorLog.status === "RESOLVED" ? "border-l-[#ff6666] text-[#ff6666]" : "border-l-[#003300] text-[#00bb00]]"}`}>{errorLog.error_message}</span>
        </div>

        {/*原因*/}
        <div className="rounded-xl bg-[#333333] px-5 py-5">
            <span className="text-xl text-gray-400">原因</span>
            <span className="text-xl">{errorLog.cause}</span>
        </div>

        {/*解決方法*/}
        <div className="rounded-xl bg-[#333333] px-5 py-5">
          <span className="text-xl text-gray-400">解決方法</span>
          <span>{errorLog.solution}</span>
        </div>

        {/*参考URL*/}
        <div className="rounded-xl bg-[#333333] px-5 py-5">
          <span className="text-xl text-gray-400">解決方法</span>
          <span className="text-[#1e90ff]">{errorLog.reference_url}</span>
        </div>
      </div>
    ))}
    </>
  )


}