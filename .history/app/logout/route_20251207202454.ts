import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = cookies();

  // Create Supabase client for SSR
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
        set: (name: string, value: string, options: any) =>
          cookieStore.set({ name, value, ...options }),
        remove: (name: string, options: any) =>
          cookieStore.set({ name, value: "", ...options }),
      },
    }
  );

  // Try to sign out (won’t error if already signed out)
  await supabase.auth.signOut();

  // Destroy tokens explicitly
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

  // Redirect to login
  return NextResponse.redirect(
    new URL(
      "/login",
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    )
  );
}
