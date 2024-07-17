/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors used in the project
      colors: {
        primary: "#2B85FF",
        secondary: "#EF863E",
        'cpurple' : 'rgb(103, 65, 136)',
        'lightpurple': 'rgb(203, 187, 233)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

