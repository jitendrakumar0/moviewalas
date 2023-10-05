/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'black1': '#04152d',
      'black2': '#041226',
      'black3': '#020c1b',
      'blacklighter': '#1c4b91',
      'blacklight': '#173d77',
      'white': '#ffffff',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#da2f68',
      'orange': '#f89e00',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    // fontFamily: {
    //   sans: ['Graphik', 'sans-serif'],
    //   serif: ['Merriweather', 'serif'],
    // },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      backgroundImage: {
        'gradient1': 'linear-gradient(98.37deg, #75003b 0.99%, #22083f 100%)',
        'gradient2': 'linear-gradient(180deg,rgba(4, 21, 45, 0) 0%,#22083f 79.17%)',
        'gradient3': 'linear-gradient(180deg,rgba(4, 21, 45, 0) 0%,#04152d 79.17%)'
      },
      boxShadow: {
        'custom1': '0px 0px 1px black, 0px 0px 1px black, 0px 0px 1px black, 0px 0px 2px white, 0px 0px 2px white',
      },
    },
  },
  plugins: [],
};
