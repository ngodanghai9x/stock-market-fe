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
      myGreen: {
        DEFAULT: '#00f4b0',
      },
      myRed: {
        DEFAULT: '#ff3747',
      },
      myPurple: {
        DEFAULT: '#e683ff',
      },
      myBlue: {
        DEFAULT: '#64baff',
      },
      myOrage: {
        DEFAULT: '#fbac20',
      },
      myHighlight: {
        DEFAULT: '#434343',
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
