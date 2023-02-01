const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  darkMode: false,
  purge: ["./src/**/*.njk"],
  theme: {
    extend: {
      colors: {
        primary: "#005b96",
        secondary: "#fc6767",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Merriweather", ...defaultTheme.fontFamily.sans],
      },
      inset: {
        "1/20": "5%",
      },
      screens: {
        print: {
          raw: "print",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
