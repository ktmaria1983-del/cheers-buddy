import "./globals.css";
import NavBar from "./components/NavBar";

export const metadata = {
  title: "Cheers Buddy",
  description: "Real people cheering real progress",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100">
        <NavBar />
        {children}
      </body>
    </html>
  );
}


