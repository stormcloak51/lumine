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
    },
  },
  plugins: [],
};
export default config;
