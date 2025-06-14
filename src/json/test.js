/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            100: '#E0F2FF', 
            200: '#B3DAFF',
            300: '#80C0FF',
            400: '#4DA6FF',
            500: 'var(--primary, #1A8CFF)', 
            600: '#0066CC',
            700: '#004C99',
            DEFAULT: 'var(--primary, #1A8CFF)',
          },
          secondary: {
            200: '#FFECCC',
            300: '#FFD699',
            400: '#FFC266',
            500: 'var(--secondary, #FFAD33)',
            700: '#CC8800',
            DEFAULT: 'var(--secondary, #FFAD33)',
          },
          tertiary: {
            100: '#F0FFF4',
            200: '#C6F6D5',
            300: '#9AE6B4',
            500: 'var(--tertiary, #48BB78)',
            600: '#38A169',
            700: '#2F855A',
            DEFAULT: 'var(--tertiary, #48BB78)',
          },
        },
        screens: {
          xs: "480px",
        },
        fontSize: {
          xs: "0.75rem",
          sm: "0.875rem",
          base: "1rem",
          lg: "1.125rem",
          xl: "1.5rem",
          "2xl": "2rem",
          "3xl": "2.5rem",
          "4xl": "3rem",
          "5xl": "3.75rem",
          "6xl": "4.5rem",
          "7xl": "6rem",
        },
        spacing: {
          0: "0px",
          1: "0.25rem",
          2: "0.5rem",
          4: "1rem",
          8: "2rem",
          16: "4rem",
          32: "8rem",
        },
        borderRadius: {
          none: "0px",
          sm: "2px",
          DEFAULT: "6px",
          md: "8px",
          lg: "12px",
          xl: "16px",
          "2xl": "24px",
          "3xl": "30px",
          full: "9999px",
        },
      },
    },
    plugins: [],
  };
  