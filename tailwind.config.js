/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' if you prefer the dark mode based on user's OS preference
  theme: {
    extend: {
      height: {
        "21.5rem": "21.5rem",
      },
      fontFamily: {
        glooock: ["Glooock", "serif"],
      },
      colors: {
        orange_font: "#FCA311",
        header_text: "#14213D",
        light_beige: "#F5F5DC",
      },
    },
  },
  plugins: [],
};
