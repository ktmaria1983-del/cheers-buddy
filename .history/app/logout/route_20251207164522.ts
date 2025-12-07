import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Sign out from Supabase server-side
  const { error } = await supabase.auth.signOut();

  // Always delete the tokens manually
  cookieStore.set({
    name: "sb-access-token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  cookieStore.set({
    name: "sb-refresh-token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  if (error) {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }

  // FIX: use `request.url`, not req.url
  return NextResponse.redirect(new URL("/", request.url));
}

