/** @type {import('tailwindcss').Config} */
module.exports = {
  // we're opting out default prefers-scheme-color media query for manual setting
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
