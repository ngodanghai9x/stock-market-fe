const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      ...colors,
      xxx: {
        DEFAULT: '',
        700: '',
        800: '',
      },
      blue: {
        purple: '#272262',
        'purple-dark': '#211C52',
      },
    },
    extend: {
      screens: {
        ultra: '1440px',
        wide: '1180px',
        large: '880px',
        medium: '860px',
        small: '680px',
      },
    },
  },
  plugins: [],
  purge: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@setel/react-setel/dist/**/*.js'],
};
