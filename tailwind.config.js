/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: { 500: "500px" },
      colors: {
        peach: "#EF798A",
        blue: "#0654A0",
        white: "#FFFFFF",
        lblue: "#D7EAF9",
        greyblue: "#F3FAF8",
      },

      boxShadow: {
        lg: "1px 1px 6px rgba(0, 0, 0, 0.05), 1px 1px 6px rgba(0, 0, 0, 0.05);",
      },
    },

    fontFamily: {
      OpenSans: ["Open Sans", "sans-serif"],
    },
  },

  plugins: [],
};
