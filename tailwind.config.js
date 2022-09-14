/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.js',
    './components/**/*.js',
    './lib/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair', 'serif'],
      },
      colors: {
        petrol: '#234343',
        pink: '#ffbac4',
        coral: '#ff5467',
        purple: '#5136b7',
      },
      borderRadius: {
        xl: '1.2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  safelist: [
    {
      pattern: /(bg|text|border)-(pink|purple|petrol|coral)/,
    },
  ],
}
