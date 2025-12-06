import { supabase } from "@/lib/supabase";
import { NextRequest } from "next/server";

// ---------------------
// GET – fetch wins
// ---------------------
export default function ReportsPage() {
  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold">Admin Reports</h1>
      <p>This page is now working correctly.</p>
    </div>
  );
}
