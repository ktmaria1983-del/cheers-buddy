"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load current user profile
  useEffect(() => {
    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
      setLoading(false);
    }

    load();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading)
    return (
      <p className="pt-32 text-center text-slate-300">Loading profile…</p>
    );

  return (
    <div className="pt-32 max-w-xl mx-auto px-6 text-white">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="rounded-2xl bg-[#0f0f16]/80 border border-white/10 p-6">
        <p className="mb-3">
          <span className="text-slate-400">User ID:</span> {profile?.id}
        </p>

        <p className="mb-3">
          <span className="text-slate-400">Display Name:</span>{" "}
          {profile?.display_name ?? "Not set"}
        </p>

        <p className="mb-6">
          <span className="text-slate-400">Joined:</span>{" "}
          {new Date(profile?.created_at).toLocaleString()}
        </p>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-full bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black font-semibold shadow-lg hover:scale-[1.05] transition"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
