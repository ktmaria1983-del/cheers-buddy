export default function Footer() {
  return (
    <footer
      className="
        mt-24 mb-10 mx-auto w-[92%] max-w-4xl 
        rounded-2xl p-[1px]
        bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
        shadow-[0_0_35px_rgba(255,255,255,0.20)]
        backdrop-blur-xl
      "
    >
      <div
        className="
          rounded-2xl bg-[#0f0f16]/80 backdrop-blur-xl
          px-6 py-8 text-center space-y-6
        "
      >
        {/* Tagline */}
        <h3
          className="
            text-xl font-semibold 
            gradient-text animate-shimmer 
            bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2] 
            bg-clip-text text-transparent
          "
        >
          In a world that measures worth in cash,  
          we measure it in cheers.
        </h3>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a className="text-slate-300 hover:text-white transition" href="/">
            Home
          </a>

          <a className="text-slate-300 hover:text-white transition" href="/explore">
            Explore
          </a>

          <a className="text-slate-300 hover:text-white transition" href="/about">
            About
          </a>

          <a className="text-slate-300 hover:text-white transition" href="/privacy">
            Privacy
          </a>

          <a className="text-slate-300 hover:text-white transition" href="/terms">
            Terms
          </a>
        </div>

        {/* Small Print */}
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} CheersBuddy — Built to cheer your growth.
        </p>
      </div>
    </footer>
  );
}
