import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Lang } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const seg = pathname.split("/")[1];
  if (locales.includes(seg as Lang)) {
    const res = NextResponse.next();
    res.cookies.set("locale", seg, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return res;
  }

  const cookie = request.cookies.get("locale")?.value;
  const target = (locales.includes(cookie as Lang) ? cookie : defaultLocale) as Lang;
  const url = request.nextUrl.clone();
  url.pathname = `/${target}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|admin|_next|.*\\..*).*)"],
};