/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        PTSerif:['PT Serif', 'serif']

      },
      boxShadow: {
        'blu': '-16px 16px 12px -6px rgba(0, 0, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 255, 0.06)',
      },
    },
  },
  plugins: [],
}

