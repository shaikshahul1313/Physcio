/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
