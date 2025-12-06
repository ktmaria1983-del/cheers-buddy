"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus(null);
      router.push("/"); // go home after login
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-md mx-auto text-[#e4e4e7]">
      <h1 className="text-3xl font-bold mb-6 text-center">Log in</h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4 rounded-2xl bg-[#0f0f16]/90 border border-white/10 p-6 backdrop-blur-2xl"
      >
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-lg bg-white/5 border border-white/10
              px-3 py-2 text-sm text-[#e4e4e7]
              focus:outline-none focus:border-[#ffd78a]
            "
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              w-full rounded-lg bg-white/5 border border-white/10
              px-3 py-2 text-sm text-[#e4e4e7]
              focus:outline-none focus:border-[#ffd78a]
            "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
            w-full mt-4 px-4 py-2 rounded-full font-semibold
            bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
            text-black shadow-md
            hover:scale-[1.02] active:scale-[0.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {status && (
          <p className="mt-3 text-sm text-center text-red-400">{status}</p>
        )}
      </form>
    </div>
  );
}

