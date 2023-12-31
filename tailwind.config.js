/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        ys: '0.6rem',
        xxs: '0.7rem'
      },
      screens: {
        'xs': '475px',
        'ys': '360px'
      },
    }
  },
  plugins: [],
}