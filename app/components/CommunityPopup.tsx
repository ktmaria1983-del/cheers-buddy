"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommunityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // --- SMART LOGIC ---
    const lastSeen = localStorage.getItem("community_popup_last_seen");
    const now = Date.now();

    // If popup was seen less than 24 hours ago → don't show again
    if (lastSeen && now - parseInt(lastSeen) < 24 * 60 * 60 * 1000) {
      return;
    }

    // Show after delay
    const timer = setTimeout(() => {
      setOpen(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  // When closing → save timestamp
  const closePopup = () => {
    localStorage.setItem("community_popup_last_seen", Date.now().toString());
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
        >
          {/* --- MAIN POPUP CARD --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-[90%] max-w-md p-8 rounded-3xl 
                       bg-gradient-to-b from-[#1a1a20] to-[#121218]
                       border border-white/10 shadow-2xl text-white overflow-hidden"
          >
            {/* --- Premium Floating Glow Orbs --- */}
            <motion.div
              className="absolute -top-10 -left-10 w-48 h-48 bg-violet-500/20 blur-[100px] rounded-full"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-48 h-48 bg-pink-500/20 blur-[100px] rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 7, repeat: Infinity }}
            />

            {/* --- Content --- */}
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold mb-3 text-center"
            >
              Join Our Safe Community 💖
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-center mb-6"
            >
              Meet gentle, supportive people who celebrate wins, uplift each other,
              and understand sensitive souls. You are warmly invited.
            </motion.p>

            {/* --- CTA button --- */}
            <motion.a
              href="https://www.facebook.com/groups/1452849042429487"
              target="_blank"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="block w-full text-center font-semibold text-lg px-6 py-3 mb-5
                         rounded-full bg-gradient-to-r 
                         from-pink-500 via-purple-500 to-indigo-500
                         shadow-lg shadow-purple-700/40
                         hover:scale-[1.04] transition-all"
              onClick={closePopup}
            >
              Join the Facebook Group
            </motion.a>

            {/* --- Dismiss button --- */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              onClick={closePopup}
              className="w-full text-center py-2 text-gray-400 hover:text-gray-200 transition"
            >
              Not now
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
