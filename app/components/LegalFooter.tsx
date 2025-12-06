"use client";

import ReportModal from "./ReportModal";
import Link from "next/link";

export default function LegalFooter() {
  return (
    <footer className="w-full mt-20 py-8 border-t border-white/10 bg-white/5 backdrop-blur-lg text-gray-300">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Cheers Buddy. All rights reserved.
        </p>

        {/* RIGHT LINKS */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/terms"
            className="hover:text-pink-300 transition-colors"
          >
            Terms
          </Link>

          <Link
            href="/privacy"
            className="hover:text-pink-300 transition-colors"
          >
            Privacy
          </Link>

          <Link
            href="/guidelines"
            className="hover:text-pink-300 transition-colors"
          >
            Guidelines
          </Link>
          <ReportModal />
          
        </div>

      </div>
    </footer>
  );
}
