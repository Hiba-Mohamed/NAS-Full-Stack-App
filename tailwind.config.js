/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        peach: "#EF798A",
        green: "#68B0AB",
        white: "#FFFFFF",
        lgreen: "#8FC0A9",
        greygreen: "#F3FAF8",
      },

      boxShadow: {
        lg: "1px 1px 6px rgba(0, 0, 0, 0.05), 1px 1px 6px rgba(0, 0, 0, 0.05);",
      },
    },

    fontFamily: {
      nunito: ['"Nunito"', "sans-serif"],
    },
  },

  plugins: [],
};

