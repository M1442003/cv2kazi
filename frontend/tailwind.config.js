module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#DC2626",
          darkred: "#B91C1C",
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