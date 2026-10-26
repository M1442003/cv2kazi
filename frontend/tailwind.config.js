/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#dc4e26",
          darkred: "#1cb9b9",
          blue: "#1E3A8A",
          lightblue: "#2563EB",
          cream: "#F8FAFC",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      animation: {
        "float-rotate": "floatRotate 8s ease-in-out infinite",
      },
      keyframes: {
        floatRotate: {
          "0%, 100%": {
            transform: "rotateY(-15deg) translateY(0px)",
          },
          "50%": {
            transform: "rotateY(15deg) translateY(-12px)",
          },
        },
      },
    },
  },
  plugins: [],
};