/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryColor: '#A5CD38',
        bgPrimary: '#1f2937',
        textPrimary: '#dddddd',

        secondary: '#333333',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#eab308',
        info: '#14b8a6',
        light: '#9ca3af'
      }
    }
  },
  darkMode: 'class',
  plugins: []
}