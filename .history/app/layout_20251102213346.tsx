import "./globals.css";
import type { Metadata } from "next";
import NavBar from "./components/NavBar"; // ← path is from app → app/components

export const metadata: Metadata = {
  title: "Cheers Buddy",
  description: "Real people cheering real progress",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 antialiased">
        <NavBar />
        <main className="w-full px-8 pt-20 pb-24">{children}</main>
      </body>
    </html>
  );
}




