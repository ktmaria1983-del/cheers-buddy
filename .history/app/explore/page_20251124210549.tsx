{/* PREMIUM MODAL */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center 
                  bg-black/60 backdrop-blur-md animate-fadeIn">

    {/* Modal Container */}
    <div 
      id="new-win-modal"
      className="relative w-[90%] max-w-md 
                 rounded-3xl p-[2px]
                 bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                 shadow-[0_0_45px_rgba(0,0,0,0.4)]
                 animate-[scaleIn_.35s_ease-out]"
    >
      <div className="rounded-3xl bg-[#0f0f16]/90 backdrop-blur-2xl p-7">

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 h-9 w-9 rounded-full
                     bg-white/10 border border-white/20 text-white text-lg
                     flex items-center justify-center
                     hover:bg-white/20 hover:scale-[1.08]
                     transition shadow-[0_0_15px_rgba(255,255,255,0.25)]"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-center text-3xl font-bold mb-6
                       bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                       bg-clip-text text-transparent">
          Add a New Win 🎉
        </h2>

        {/* Category */}
        <label className="block mb-3">
          <span className="text-sm text-slate-300">Category</span>
          <input
            type="text"
            value={newWin.category}
            onChange={(e) => setNewWin({ ...newWin, category: e.target.value })}
            placeholder="Sewing, Coding, Fitness..."
            className="w-full mt-1 p-3 rounded-xl 
                       bg-white/5 border border-white/10 
                       text-white placeholder-slate-400
                       focus:ring-2 focus:ring-[#ffd78a] outline-none"
          />
        </label>

        {/* Title */}
        <label className="block mb-3">
          <span className="text-sm text-slate-300">Title *</span>
          <input
            type="text"
            value={newWin.title}
            onChange={(e) => setNewWin({ ...newWin, title: e.target.value })}
            placeholder="I learned loops today!"
            className="w-full mt-1 p-3 rounded-xl 
                       bg-white/5 border border-white/10 
                       text-white placeholder-slate-400
                       focus:ring-2 focus:ring-[#ffd78a] outline-none"
          />
        </label>

        {/* Body */}
        <label className="block mb-5">
          <span className="text-sm text-slate-300">Details (optional)</span>
          <textarea
            value={newWin.body}
            onChange={(e) => setNewWin({ ...newWin, body: e.target.value })}
            placeholder="Explain your small win…"
            rows={4}
            className="w-full mt-1 p-3 rounded-xl resize-none
                       bg-white/5 border border-white/10 
                       text-white placeholder-slate-400
                       focus:ring-2 focus:ring-[#ffd78a] outline-none"
          />
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            disabled={saving}
            className="px-5 py-2 rounded-full
                       bg-white/10 text-slate-300
                       border border-white/20
                       hover:bg-white/20 hover:scale-[1.03]
                       transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={createWin}
            disabled={saving}
            className="px-5 py-2 rounded-full font-semibold text-black
                       bg-gradient-to-r from-[#ff9aea] via-[#ffd78a] to-[#6fffc2]
                       shadow-[0_0_15px_rgba(255,255,255,0.3)]
                       hover:scale-[1.05] active:scale-[0.98]
                       transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>

      </div>
    </div>
  </div>
)}
