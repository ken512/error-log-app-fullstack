import Link from "next/link";
import { auth } from "@/utils/auth/auth";
import { logout } from "../auth/actions/signout";

// セッション取得と認証UI切り替えのコンポーネント
export const HeaderAuth = async () => {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <span className="text-gray-400 text-sm px-2 py-1 border border-gray-700 rounded w-fit">
            状態: ログイン中({session.user.name || "ユーザー"})
          </span>

          <form action={logout} className="w-full md:w-auto">
            <button
              type="submit"
              className="rounded text-red-400 hover:text-red-300 block px-2 py-2 text-left w-full transition-colors duration-200"
            >
              ログアウト
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <Link
            href="/login"
            className="text-white text-md hover:text-gray-300 block py-2 px-2"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="text-white text-md hover:text-gray-300 block py-2 px-2"
          >
            サインアップ
          </Link>
        </div>
      )}
    </>
  );
};
