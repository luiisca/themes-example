/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  // we're opting out default prefers-scheme-color media query for manual setting
  darkMode: false,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      colors: {
        "th-primary": "var(--primary)",
        "th-primary-focus": "var(--primary-focus)",
        "th-secodary": "var(--secondary)",
        "th-accent": "var(--accent)",
      },
    },
  },
  plugins: [],
};
