"use client";
import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "info" | "error";
  duration?: number; // ms
};

export default function Toast({ message, type = "info", duration = 1500 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 rounded-lg px-4 py-2 text-sm text-white shadow-lg
                  ${type === "error" ? "bg-red-500" : "bg-sky-500"}`}
    >
      {message}
    </div>
  );
}
