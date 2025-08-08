/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",          // if you're using Vite
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
  animation: {
    fadeIn: 'fadeIn 0.5s ease-out',
    slideUp: 'slideUp 0.5s ease-out',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { opacity: '0', transform: 'translateY(20px)' },
      '100%': { opacity: '1', transform: 'translateY(0)' },
    },
  },
},

  },
  plugins: [],
};
