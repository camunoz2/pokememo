/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "color-darkblue": "#232C57",
        "color-cyan": "#06D591",
        "color-lightblue": "#303966",
        "color-purple": "#994FFE",
      },
      backgroundImage: {
        pattern: "url('/bg.jpg')",
      },
    },
  },
  plugins: [],
};
