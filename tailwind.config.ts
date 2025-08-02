import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pfwGold: '#CEB888',
      },
      fontFamily: {
        acumin: ['"Acumin Pro"', 'sans-serif'],
        united: ['"United Sans"', 'sans-serif'],
        sourceSerif: ['"Source Serif Pro"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
