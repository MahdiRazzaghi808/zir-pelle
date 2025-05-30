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
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          DEFAULT: "var(--primary-500)",
        },
        secondary: {
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          700: "var(--secondary-700)",
          DEFAULT: "var(--secondary-500)",
        },
        tertiary: {
          100: "var(--tertiary-100)",
          200: "var(--tertiary-200)",
          300: "var(--tertiary-300)",
          500: "var(--tertiary-500)",
          600: "var(--tertiary-600)",
          700: "var(--tertiary-700)",
          DEFAULT: "var(--tertiary-500)",
        },
        white: "var(--white)",
        black: "var(--black)",
      },
      screens: {
        xs: "480px",
      },
      fontSize: {
        xs: "0.75rem",  // 12px
        sm: "0.875rem", // 14px
        base: "1rem",   // 16px
        lg: "1.125rem", // 18px
        xl: "1.5rem",   // 24px
        "2xl": "2rem",  // 32px
        "3xl": "2.5rem",// 40px
        "4xl": "3rem",  // 48px
        "5xl": "3.75rem",// 60px
        "6xl": "4.5rem",// 72px
        "7xl": "6rem",  // 96px
      },
      spacing: {
        0: "0px",
        1: "0.25rem",  // 4px
        2: "0.5rem",   // 8px
        4: "1rem",     // 16px
        8: "2rem",     // 32px
        16: "4rem",    // 64px
        32: "8rem",    // 128px
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
