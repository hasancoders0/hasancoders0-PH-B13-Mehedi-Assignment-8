/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FDB813",
        secondary: "#FF7F50",
        accent: "#38BDF8",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.1)",
      },
      borderRadius: {
        card: "1.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        summer: {
          primary: "#FDB813",
          secondary: "#FF7F50",
          accent: "#38BDF8",
          neutral: "#ffffff",
          "base-100": "#f9fafb",
        },
      },
    ],
  },
};