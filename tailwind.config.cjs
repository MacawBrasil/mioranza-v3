/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    screens: {
      '1xl': { max: '1512px' },
      // => @media (max-width: 1535px) { ... }
      '1366p': { max: '1366px' },

      xl: { max: '1280px' },
      // => @media (max-width: 1279px) { ... }

      lg: { max: '1024px' },
      // => @media (max-width: 1023px) { ... }

      md: { max: '768px' },
      // => @media (max-width: 767px) { ... }

      sm: { max: '640px' },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      backgroundImage: {
        banner_gradient: 'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 90.2%)',
      },
      fontFamily: {
        rasbern: ['var(--font-rasbern)'],
        grotesk: ['var(--font-grotesk)'],
      },
    },
  },
  plugins: [],
}
