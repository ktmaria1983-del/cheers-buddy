"use client";

import { useState } from "react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await loginAction(formData);

    setLoading(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    window.location.href = "/admin/reports"; // redirect to dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#0f0f16] p-10 rounded-xl border border-white/10 space-y-4 w-[350px]"
      >
        <h1 className="text-2xl font-semibold">Admin Login</h1>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="w-full p-3 rounded bg-white/5 border border-white/20"
        />

        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full p-3 rounded bg-white/5 border border-white/20"
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full p-3 font-semibold rounded bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}


