export default function NavBar() {
  return (
    <nav className="sticky top-0 z-50 mb-10 flex items-center justify-between border-b border-white/10 bg-slate-900/70 px-6 py-4 backdrop-blur-md">
      <h1 className="text-xl font-bold tracking-tight">
        🎉 <span className="text-sky-400">Cheers</span> Buddy
      </h1>

      <div className="flex items-center gap-3 text-sm">
        <a href="/" className="text-slate-300 hover:text-sky-400 transition">
          Home
        </a>
        <a href="#" className="text-slate-300 hover:text-sky-400 transition">
          Explore
        </a>
        <button
          className="rounded-xl bg-sky-500 px-4 py-1.5 font-semibold text-slate-900 transition active:scale-[.98]"
        >
          Log in
        </button>
      </div>
    </nav>
  );
}
