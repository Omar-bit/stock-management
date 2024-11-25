/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#5DA9E3' /*'#061B4A '*/,
      secondary: '#E061B2 ',
      third: '#FFFFFF',
      forth: '#5DA9E3',
      aux: '#707070',
      signP: '#9DF6A6',
      signM: '#BC1313',
    },
    screens: {
      sm: '500px',
      // => @media (min-width: 640px) { ... }

      md: '550px',
      // => @media (min-width: 768px) { ... }

      lg: '850px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
