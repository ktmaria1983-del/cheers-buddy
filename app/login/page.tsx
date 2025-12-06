"use client";

import { useState, useTransition } from "react";
import { loginAction } from "./loginAction";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");

    startTransition(async () => {
      const result = await loginAction(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Login success → redirect
      window.location.href = "/admin/reports";
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <form
        action={handleSubmit}
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
          disabled={isPending}
          type="submit"
          className="w-full p-3 font-semibold rounded bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] text-black disabled:opacity-60"
        >
          {isPending ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
}
