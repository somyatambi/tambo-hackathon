import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Calming nature-inspired palette
        calm: {
          50: '#f6f8f6',
          100: '#e3eae3',
          200: '#c7d5c8',
          300: '#9fb8a2',
          400: '#709477',
          500: '#4f7857',
          600: '#3d5e44',
          700: '#324c37',
          800: '#2a3f2e',
          900: '#243428',
        },
        sage: {
          50: '#f7f8f7',
          100: '#e8ebe8',
          200: '#d4dcd5',
          300: '#b3c2b6',
          400: '#8ea195',
          500: '#6f8477',
          600: '#596b5f',
          700: '#49574e',
          800: '#3d4942',
          900: '#353e38',
        },
        lavender: {
          50: '#f9f7fb',
          100: '#f1ecf7',
          200: '#e5dcef',
          300: '#d2c1e3',
          400: '#ba9cd3',
          500: '#a378bf',
          600: '#8c5ca7',
          700: '#754b8a',
          800: '#624172',
          900: '#52375e',
        },
        warmbeige: {
          50: '#faf9f7',
          100: '#f2ede8',
          200: '#e6ddd2',
          300: '#d4c5b3',
          400: '#bea78f',
          500: '#a88d72',
          600: '#987966',
          700: '#7f6556',
          800: '#69544a',
          900: '#57463d',
        },
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
