/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' if you prefer the dark mode based on user's OS preference
  theme: {
    extend: {
      height: {
        "21.5rem": "21.5rem",
      },
    },
  },
  plugins: [],
};
