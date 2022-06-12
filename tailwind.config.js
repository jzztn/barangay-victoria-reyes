/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0AA435",
        gray: "#A8A7A7"
      },
      fontFamily: {
        'hero': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}
