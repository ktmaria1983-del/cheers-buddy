import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({
    request: {
      headers: req.headers
    }
  });

  // Correct cookie binding
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          // overwrite only when values change
          res.cookies.set(name, value, options);
        },
        remove(name, options) {
          res.cookies.set(name, "", { ...options, maxAge: 0 });
        }
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const url = req.nextUrl;
  const pathname = url.pathname;

  const isAdminRoute = pathname.startsWith("/admin");

  // 🔒 ADMIN PROTECTION
  if (isAdminRoute) {
    if (!session) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
  }

  // ↩ Redirect logged-in users away from login/signup
  if (session && ["/login", "/signup"].includes(pathname)) {
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};



