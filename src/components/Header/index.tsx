

import Link from "next/link";
import { HeaderAuth } from "./HeaderAuth";
import { MenuBar } from "../MenuBar";
import { auth } from "@/utils/auth/auth";

export const Header = async () => {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user);

  return (
    <header className="flex justify-between mx-10">
      <div className="flex gap-3">
        <Link href="/">error_log</Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[30px] h-[30px] fill-[#1e90ff]"
          viewBox="0 0 16 16"
        >
          <path d="M4.978.855a.5.5 0 1 0-.956.29l.41 1.352A5 5 0 0 0 3 6h10a5 5 0 0 0-1.432-3.503l.41-1.352a.5.5 0 1 0-.956-.29l-.291.956A5 5 0 0 0 8 1a5 5 0 0 0-2.731.811l-.29-.956z" />
          <path d="M13 6v1H8.5v8.975A5 5 0 0 0 13 11h.5a.5.5 0 0 1 .5.5v.5a.5.5 0 1 0 1 0v-.5a1.5 1.5 0 0 0-1.5-1.5H13V9h1.5a.5.5 0 0 0 0-1H13V7h.5A1.5 1.5 0 0 0 15 5.5V5a.5.5 0 0 0-1 0v.5a.5.5 0 0 1-.5.5zm-5.5 9.975V7H3V6h-.5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 0-1 0v.5A1.5 1.5 0 0 0 2.5 7H3v1H1.5a.5.5 0 0 0 0 1H3v1h-.5A1.5 1.5 0 0 0 1 11.5v.5a.5.5 0 1 0 1 0v-.5a.5.5 0 0 1 .5-.5H3a5 5 0 0 0 4.5 4.975" />
        </svg>
        <nav className="hidden md:block mx-10 font-bold">
          <Link href="#" className="hover:text-gray-300 px-5">エラーログ一覧</Link>
          <Link href="#" className="hover:text-gray-300 px-5">新規投稿</Link>
          <Link href="#" className="hover:text-gray-300 px-5">マイページ</Link>
        </nav>
      </div>
      <HeaderAuth />
      <MenuBar isLoggedIn={isLoggedIn}/>
    </header>
  );
};
