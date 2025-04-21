/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb", // light blue
        background: "#f7faff",
      },
    },
  },
  plugins: [],
}

