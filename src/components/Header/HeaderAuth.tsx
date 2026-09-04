import Link from "next/link";
import { auth } from "@/utils/auth/auth";
import { logout } from "../../features/auth/actions/signout";

// セッション取得と認証UI切り替えのコンポーネント
export const HeaderAuth = async () => {
  const session = await auth();

  return (
    <>
      {session?.user ? (
        <div className="hidden md:block flex items-center gap-4">
          <span className="text-white text-md hover:text-gray-300">
            ログイン中
          </span>

          <form action={logout}>
            <button
              type="submit"
              className="rounded bg-white px-4 py-2 text-black hover:bg-gray-400"
            >
              ログアウト
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-white text-md hover:text-gray-300 "
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="text-white text-md hover:text-gray-300"
          >
            サインアップ
          </Link>
        </div>
      )}
    </>
  );
};
