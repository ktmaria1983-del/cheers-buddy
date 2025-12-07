// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import LegalFooter from "./components/LegalFooter";
import CommunityPopup from "@/components/CommunityPopup";

export const metadata: Metadata = {
  title: "CheersBuddy",
  description: "Real people cheering real progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen 
          bg-gradient-to-b 
          from-[#0f0f16] via-[#12131d] to-[#181926] 
          text-[#e4e4e7] 
          antialiased
        "
      >
        {/* Navbar stays at the top */}
        <NavBar />

        {/* Community popup appears globally */}
        <CommunityPopup />

        {/* Main content */}
        <main className="mx-auto max-w-7xl px-6 md:px-10 pt-36 pb-24">
          {children}
        </main>

        {/* Footers */}
        <Footer />
        <LegalFooter />
      </body>
    </html>
  );
}


