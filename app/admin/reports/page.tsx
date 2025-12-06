import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

// ---------------------
// GET – fetch wins
// ---------------------

export default function ReportsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Reports (Wins)</h1>
      <p className="text-slate-300">Wins table will appear here.</p>
    </div>
  );
}
