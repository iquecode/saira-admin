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
        brandGreen: {
          300: "#36D399",
          500: "#00a859", 
        },
        brandOrange: {
          400: "#f6944c",
          500: "#f58634"
        },
        brandBlue: {
          500: "#389ccb", 
        },
        brandPink: {
          500: "#dc3d91"
        },
        brandYellow: {
          400: "#fcd249",
          500: "#ffcc29"
        }

      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
