/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "serif"],
    },
    extend: {
      width: {
        128: "32rem",
      },
      height: {
        128: "32rem",
      },
      colors: {
        white: "#ffffff",
        dark: "#1e293b",
        lighten: "#f8fafc",
        darken: "#e2e8f0",
        gray: "#e5e7eb",
        darkGray: "#9ca3af",
        red: "#ef4444",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
