/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#040f1e', // Matches DJ portfolio
        panel: 'rgba(0,180,230,0.05)',
        cyan: '#00e5ff',
        red: '#ff1744'
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        mono: ['Share Tech Mono', 'monospace'],
        body: ['Rajdhani', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
