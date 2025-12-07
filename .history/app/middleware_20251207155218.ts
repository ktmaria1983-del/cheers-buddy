import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  let res = NextResponse.next();

  // Build supabase client with correct cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return req.cookies.get(name)?.value;
        },
        set(name, value, options) {
          res.cookies.set({
            name,
            value,
            ...options
          });
        },
        remove(name, options) {
          res.cookies.set({
            name,
            value: "",
            ...options
          });
        }
      }
    }
  );

  // Get user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const pathname = req.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");

  // 🔒 1. PROTECT ADMIN AREA
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check user role from Supabase table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();

    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  // 🔄 2. REDIRECT LOGGED-IN USERS AWAY FROM LOGIN / SIGNUP
  const authenticatedRedirects = ["/login", "/signup"];
  if (session && authenticatedRedirects.includes(pathname)) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/login",
    "/signup"
  ],
};



