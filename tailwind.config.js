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
      gray: {
        primary: "#BBB9BA",
        hover: "#A6A4A5",
        focus: "#929091",
      },
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
        hover: "#FDE96A",
        focus: "#FCE053",
      },
      red: {
        primary: "#F88379",
        hover: "#E97269",
        focus: "#E06058",
      },
      green: {
        primary: "#67B585",
        secondary: "#80C99B",
        hover: "#3D836E",
        focus: "#286F5A",
        secondaryHover: "#6CB38A",
      },
      orange: {
        primary: "#FF7F50",
        hover: "#FF6B35",
        focus: "#FF5619",
      },
      teal: {
        primary: "#20B2AA",
        hover: "#1A9D96",
        focus: "#138981",
      },
      coral: {
        primary: "#FF7F50",
        hover: "#FF6347",
        focus: "#FF4500",
      },
      purple: {
        primary: "#6A5ACD",
        hover: "#5A4CB8",
        focus: "#483DA2",
      },
      brown: {
        primary: "#8B4513",
        hover: "#7A3E10",
        focus: "#67340C",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
