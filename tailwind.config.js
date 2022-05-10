module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saira: {
          blue: "#389ccb",
          pink: "#dc3d91",
          yellow: "#ffcc29",
        },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
