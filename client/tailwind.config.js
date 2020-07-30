module.exports = {
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Poppins", "sans-serif"],
      },
      spacing: {
        "5/4": "125%",
        "5/6": "166.6%",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  variants: {},
  plugins: [],
};
