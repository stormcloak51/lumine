import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          0: '#fff8e1',
          50: "#fff8e1",
          100: "#ffefcb",
          200: "#ffdd9a",
          300: "#ffcb64",
          400: "#ffbb38",
          500: "#ffb11b",
          600: "#ffac09",
          700: "#e39600",
          800: "#ca8500",
          900: "#b07200"
        },
      },

      animation: {
        blob: 'blob 7s infinite'
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(15px, -25px) scale(1.2)',
          },
          '66%': {
            transform: 'translate(-10px, 10px) scale(0.8)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          }
        }
      }
    },
  },
  plugins: [],
};
export default config;
