// @ts-nocheck
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/auth-helpers-nextjs";

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies(); // ⭐ IMPORTANT FIX

  // Manual cookie wrapper required by old helper
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
  get(name) {
    return cookieStore.get(name)?.value;
  },
  set(name, value, options) {
    cookieStore.set({ name, value, ...options });
  },
  remove(name, options) {
    cookieStore.set({ name, value: "", ...options });
  },
},

    }
  );

  // Get session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  // Check role from profiles table
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/profile");
  }

  return <>{children}</>;
}
