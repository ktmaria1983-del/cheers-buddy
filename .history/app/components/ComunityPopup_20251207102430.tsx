"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommunityPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // show after 10 seconds
    const timer = setTimeout(() => {
      setOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-[90%] max-w-md p-8 rounded-3xl 
                       bg-gradient-to-b from-[#181818] to-[#0f0f0f]
                       border border-white/10 shadow-2xl text-white"
          >
            {/* Glow Orbs */}
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-purple-500/20 blur-[100px] rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-pink-500/20 blur-[100px] rounded-full"></div>

            <h2 className="text-3xl font-bold mb-3 text-center">
              Join Our Safe Community 💖
            </h2>

            <p className="text-gray-300 text-center mb-6">
              We have a gentle Facebook group where sensitive souls support each other,  
              celebrate small wins, and feel understood. You are warmly invited.
            </p>

            <a
              href="https://www.facebook.com/groups/yourgroupurl"
              target="_blank"
              className="block w-full text-center font-semibold text-lg px-6 py-3 mb-4
                         rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
                         shadow-lg hover:scale-105 transition-all"
            >
              Join the Facebook Group
            </a>

            <button
              onClick={() => setOpen(false)}
              className="w-full text-center py-2 text-gray-400 hover:text-white transition"
            >
              Not now
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
