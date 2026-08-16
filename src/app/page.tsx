"use client";

import { Footer } from "@/features/footer";

const TopPage = () => {
  return (
    <div className="mt-[150px]">
      <div className="flex flex-col gap-10">
        <p className="text-[#1e90ff] ">自分専用のStack Overflow / Qiita</p>
        <h1 className="text-white text-4xl font-bold">エラー解決ログ</h1>
        <div className="text-white text-sm">
          <p className="text-base">
            開発中に発生したエラーを記録し、
            <br />
            原因や解決方法をあとから検索・再利用できる ナレッジ管理アプリです。
          </p>
        </div>
      </div>

      <div className="border-none px-[20px] py-[20px] mx-[200px] mt-[50px] bg-[#333333] ">
        <div className="flex justify-between items-center ">
          <p>TypeError: map is not a function</p>
          <span className="border border-none rounded-md p-[4px] bg-[#003300] text-[#00bb00] ">
            解決済み
          </span>
        </div>
        <div className="flex flex-col items-start mt-[20px]">
          <p>原因</p>
          <p>APIから返ってきた値が配列ではなくObjectだった</p>
        </div>
        <div className="flex flex-col items-start mt-[20px]">
          <p>解決方法</p>
          <p>Object.values()で配列化した</p>
        </div>
        <div className="flex items-start mt-[30px]">
          <span className="border border-none rounded-md p-[4px] bg-[#003300] text-[#00bb00] ">
            React
          </span>
        </div>
      </div>

      <div className="mt-[10px] mx-[150px] mb-[100px]">
        <h3 className="mb-[50px] mt-[100px] text-xl">できること</h3>
        <div className="border border-none grid grid-cols-2 gap-4 text-start">
          <div className="p-[20px] border border-none bg-black rounded-xl flex flex-col gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] fill-[#1e90ff] "
              viewBox="0 0 16 16"
            >
              <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
              <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0" />
            </svg>
            <h4>エラーを記録</h4>
            <p>原因・解決方法までまとめて保存</p>
          </div>

          <div className="p-[20px] border border-none bg-black rounded-xl flex flex-col gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] fill-[#1e90ff] "
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            <h4>後から検索</h4>
            <p>後から検索</p>
          </div>

          <div className="p-[20px] border border-none bg-black rounded-xl flex flex-col gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] fill-[#1e90ff] "
              viewBox="0 0 16 16"
            >
              <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z" />
              <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z" />
            </svg>
            <h4>タグで管理</h4>
            <p>React、Docker など技術別に整理</p>
          </div>

          <div className="p-[20px] border border-none bg-black rounded-xl flex flex-col gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] h-[20px] fill-[#1e90ff] "
              viewBox="0 0 16 16"
            >
              <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
            </svg>
            <h4>解決方法を保存</h4>
            <p>未解決でもとりあえず記録できる</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TopPage;
