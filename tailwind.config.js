/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0086FF",
        secondary: "#666687",
        bgColor: "#F6F6F9"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
