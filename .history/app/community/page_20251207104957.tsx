"use client";

import { motion } from "framer-motion";

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen overflow-hidden 
                     bg-[#0c0c0c] text-white px-6 py-24 flex flex-col items-center">

      {/* --- Glowing background orbs --- */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/30 blur-[140px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-10 w-72 h-72 bg-pink-500/20 blur-[140px] rounded-full animate-pulse"></div>


      {/* --- Title --- */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold text-center mb-4"
      >
        Our Cheers Buddy Community

      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-300 text-lg max-w-2xl text-center mb-16"
      >
        A safe, warm, uplifting space where sensitive souls connect, share wins,
        and encourage each other. You are not alone — you are supported here.
      </motion.p>


      {/* --- Benefits Section --- */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 max-w-5xl w-full">
        {[
          {
            title: "🌱 Safe Emotional Space",
            text: "Share your progress without judgement — only gentle support."
          },
          {
            title: "🎉 Celebrate Wins",
            text: "Even the smallest achievements matter. We cheer every step."
          },
          {
            title: "🤝 Real Human Connection",
            text: "Meet people who understand your sensitivity, goals, and growth."
          },
          {
            title: "💬 Ask Questions",
            text: "Get guidance, reassurance, and experiences from others."
          },
          {
            title: "✨ Be Part of Something Beautiful",
            text: "Grow within a movement designed to uplift sensitive souls."
          },
          {
            title: "📣 Exclusive Updates",
            text: "Early access to new features, events, and Cheers Buddy releases."
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 
                       hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </section>


      {/* --- CTA Button --- */}
      <motion.a
        href="https://www.facebook.com/groups/1452849042429487"
        target="_blank"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="px-10 py-4 rounded-full bg-gradient-to-r 
                   from-pink-500 via-purple-500 to-indigo-500
                   text-white font-semibold text-lg shadow-xl shadow-purple-700/40
                   hover:scale-105 hover:shadow-purple-500/60 transition-all"
      >
        Join Our Facebook Group 💖
      </motion.a>

      {/* Spacer for layout */}
      <div className="h-32"></div>
    </main>
  );
}

