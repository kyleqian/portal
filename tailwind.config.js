module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        dog: ['Dogica', 'sans-serif'],
        heading: ['JMH Cthulhumbus Arcade', 'sans-serif'],
      },
      colors: {
        primary: '#374E4A',
        green: {
          primary: '#547e64'
        }
      },
      fontSize: {
        '2xs': '.7rem'
      },
    },
  },
  plugins: [],
};
