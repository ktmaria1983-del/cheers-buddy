
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  keyframes: {
    float: {
      '0%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(-3px)' },
      '100%': { transform: 'translateY(0)' },
    },
    glow: {
      '0%': { boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)' },
      '50%': { boxShadow: '0 0 22px rgba(147, 51, 234, 0.45)' },
      '100%': { boxShadow: '0 0 12px rgba(56, 189, 248, 0.5)' },
    },
  },
animation: {
  float: 'float 3s ease-in-out infinite',
  glow: 'glow 2.2s ease-in-out infinite',
},

    boxShadow: {
      soft: "0 10px 30px rgba(0,0,0,0.25)",
    },
    },
  },
  plugins: [],
};
