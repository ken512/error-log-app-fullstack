

import { logout } from "@/features/auth/actions/signout";
import Link from "next/link";

type Props = {
  open: boolean;
  isLoggedIn: boolean;
};

// TODO: 
export const Navigation = ({ open, isLoggedIn}: Props) => {


  return (
    <nav aria-hidden={!open} className="md:hidden w-full bg-gray-800 p-4">
      <ul className="flex flex-col gap-4">
        <li>
          <Link href="src/app/page.tsx" className="text-white text-md hover:text-gray-300 block py-2">ホーム</Link>
        </li>
        <li>
          <Link href="#" className="text-white text-md hover:text-gray-300 block py-2">エラーログ一覧</Link>
        </li>
        <li>
          <Link href="#" className="text-white text-md hover:text-gray-300 block py-2">マイページ</Link>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <Link
                href="/new-errorlog"
                className="block py-2 text-base text-white hover:text-gray-300"
              >
                新規投稿
              </Link>
            </li>

            <li>
              <Link
                href="/account"
                className="block py-2 text-base text-white hover:text-gray-300"
              >
                マイページ
              </Link>
            </li>
          </>
        )}

        {isLoggedIn ? (
          <>
            <li className="py-2 text-base text-white">
              ログイン中
            </li>

            <li>
              <form action={logout}>
                <button
                  type="submit"
                  className="block w-full py-2 text-left text-base text-white hover:text-gray-300"
                >
                  ログアウト
                </button>
              </form>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className="block py-2 text-base text-white hover:text-gray-300"
              >
                ログイン
              </Link>
            </li>

            <li>
              <Link
                href="/signup"
                className="block py-2 text-base text-white hover:text-gray-300"
              >
                サインアップ
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
