/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        navy: {
          800: '#0f1f35',
          900: '#0a1628',
          950: '#060d1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(59,130,246,0.35)',
        'glow-sm': '0 0 15px rgba(59,130,246,0.25)',
        premium: '0 8px 32px rgba(0,0,0,0.12)',
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
      },
      animation: {
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':       { opacity: '0.9', transform: 'scale(1.05)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
