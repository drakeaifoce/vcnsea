/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      black: "#090909",
      white: "#F5F5F5",
      gray: "#BBB9BA",
      blue: {
        1: "#CAF0F8",
        2: "#ADE8F4",
        3: "#90E0EF",
        4: "#48CAE4",
        5: "#00B4D8",
        6: "#0096C7",
        7: "#0077B6",
        8: "#023E8A",
        9: "#03045E",
      },
      yellow: {
        primary: "#FFEF81",
      },
      red: {
        primary: "#F88379",
      },
      green: {
        primary: "#67B585",
        hover: "#3D836E",
      },
      orange: "#FF7F50"
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
