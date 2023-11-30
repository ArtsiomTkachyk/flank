/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#708090',
        gray200: '#e5e7eb',
        gray100: '#f3f4f6',
        primaryEnabled: '#3b28cc0d',
      },
      screens: { '2xl': '1450px' },
      colors: {
        primary: '#708090',
        gray400: '#9ca3af',
        gray500: '#6b7280',
        gray900: '#111827',
        indigo900: '#312e81',
        indigo700: '#4338ca',
      },
      borderColor: {
        gray300: '#d1d5db',
        gray200: '#e5e7eb',
        indigo700: '#4338ca',
        grayLight: 'rgba(0, 0, 0, 0.10))',
        gray700: 'rgba(112, 128, 144, 0.50)',
      },
      boxShadow: {
        shadow500: '0px 20px 24px 0px rgba(0, 0, 0, 0.50)',
        shadowInset10:
          '0px -1px 0px 0px rgba(47, 43, 67, 0.10) inset, 0px 1px 3px 0px rgba(47, 43, 67, 0.10)',
        shadow600:
          '0px -1px 0px 0px rgba(47, 43, 67, 0.10) inset, 0px 1px 3px 0px rgba(47, 43, 67, 0.10)',
      },
    },
  },
  plugins: [],
};
