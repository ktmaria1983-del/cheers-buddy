// app/logout/route.ts
const {
  data: { session },
} = await supabase.auth.getSession();

if (!session) {
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST() {
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
        }
      }
    }
  );

  await supabase.auth.signOut();

  // destroy manually
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

  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
}



