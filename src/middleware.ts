import { auth } from "./utils/auth/auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./utils/auth/routes";

// 全てのルートがmiddlewareを呼び出せるようにする。
// 認証されたルート、ログイン用のルート、プライベートルート、パブリックルートの両方でミドルウェアを呼び出す時に活用。
// matcherに設定するバスはミドルウェア(authメソッド)を呼び出したいものを指定。

export default auth((req) => {
  const { nextUrl} = req;
  const isLoggedIn = !!req.auth;

  // ここでは、ユーザーのログイン状態とリクエストされたURLに基づいて、適切なページにリダイレクトするか、アクセス許可するかを決定する。
  // 認証を済ませていないユーザーには認証が必要なページ

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiAuthRoute) {
    return null;
  };

  if(isAuthRoute) {
    if(isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if(!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/signup", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)"],
};