
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#00ff41',
        'cyber-dark': '#050505',
        'cyber-lighter': '#111111'
      },
      fontFamily: {
        'mono': ['Monaco', 'Consolas', 'monospace']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out'
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 5px #00ff41, 0 0 10px #00ff41' },
          'to': { textShadow: '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41' }
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' }
        }
      }
    },
  },
  plugins: [],
}
