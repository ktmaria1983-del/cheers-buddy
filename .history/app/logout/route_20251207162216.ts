import { NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Create Supabase server client with FULL cookie adapter
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // must return a response to attach new cookies!
          const response = NextResponse.json({});
          response.cookies.set({
            name,
            value,
            ...options,
          });
          return response;
        },
        remove(name: string, options: CookieOptions) {
          const response = NextResponse.json({});
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
          return response;
        },
      },
    }
  );

  // Run signOut()
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }

  // Redirect to home after logout
  const response = NextResponse.redirect(new URL("/", req.url));
  return response;
}

