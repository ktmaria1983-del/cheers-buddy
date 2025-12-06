// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "CheersBuddy",
  description: "Real people cheering real progress",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 antialiased">

        {/* Global Nav */}
        <NavBar />

        {/* Page content */}
        <main className="mx-auto max-w-7xl px-6 md:px-10 pt-28 pb-24">
          {children}
        </main>

        {/* Global Footer */}
        <Footer />

      </body>
    </html>
  );
}

