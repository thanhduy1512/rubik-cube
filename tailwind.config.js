/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        1000: '1000px',
      },
      rotate: {
        'x-[-20deg]': '-20deg',
        'y-[-30deg]': '-30deg',
        'y-[-90deg]': '-90deg',
        'y-90': '90deg',
        'y-180': '180deg',
        'x-90': '90deg',
        'x-[-90deg]': '-90deg',
      },
      translate: {
        'z-[50px]': '50px',
        'z-[-50px]': '-50px',
        'x-[-50px]': '-50px',
        'x-[50px]': '50px',
        'y-[-50px]': '-50px',
        'y-[50px]': '50px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
