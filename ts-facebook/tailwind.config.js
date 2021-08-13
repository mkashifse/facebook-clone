module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        skin: {
          base:'#E9F0FB',
          main: '#5B628F',
          mainDark: '#0D0F35',
          accent:'#AA7465'
        }
      },
      textColor: {
        skin: {
          base:'#E9F0FB',
          mainDark: '#0D0F35',
          main: '#5B628F',
          accent:'#AA7465'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
