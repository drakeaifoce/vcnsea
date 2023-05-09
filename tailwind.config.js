/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    "colors": {
      "current": "currentColor",
      "transparent": "transparent",
      "black": "#000000",
      "white": "#ffffff",
      "teal": {
        "1": "#fafefd",
        "2": "#f1fcfa",
        "3": "#e7f9f5",
        "4": "#d9f3ee",
        "5": "#c7ebe5",
        "6": "#afdfd7",
        "7": "#8dcec3",
        "8": "#53b9ab",
        "9": "#12a594",
        "10": "#0e9888",
        "11": "#067a6f",
        "12": "#10302b"
      },
      "red": {
        "1": "#fffcfc",
        "2": "#fff8f8",
        "3": "#ffefef",
        "4": "#ffe5e5",
        "5": "#fdd8d8",
        "6": "#f9c6c6",
        "7": "#f3aeaf",
        "8": "#eb9091",
        "9": "#e5484d",
        "10": "#dc3d43",
        "11": "#cd2b31",
        "12": "#381316"
      },
      "sage": {
        "1": "#fbfdfc",
        "2": "#f8faf9",
        "3": "#f1f4f3",
        "4": "#ecefed",
        "5": "#e6e9e8",
        "6": "#dfe4e2",
        "7": "#d7dcda",
        "8": "#c2c9c6",
        "9": "#8a918e",
        "10": "#808784",
        "11": "#6a716e",
        "12": "#111c18"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
