/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        bounceIn: 'bounceIn 0.8s ease-out',
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
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(10px)',
          },
          '60%': {
            opacity: '1',
            transform: 'scale(1.05) translateY(-5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
      },
      colors: {
        primary: '#1D4ED8',
        secondary: '#9333EA',
        accent: '#F59E0B',
      },
      boxShadow: {
        card: '0 4px 14px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        fancy: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
