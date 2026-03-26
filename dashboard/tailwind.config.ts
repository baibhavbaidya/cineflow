import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        mono: ["'DM Mono'", "monospace"],
        body: ["'Barlow'", "sans-serif"],
      },
      colors: {
        cinema: {
          black: "#080808",
          dark: "#0f0f0f",
          card: "#141414",
          border: "#1f1f1f",
          amber: "#f5a623",
          gold: "#d4a017",
          red: "#e63946",
          muted: "#555555",
          text: "#e8e8e8",
          dim: "#888888",
        },
      },
    },
  },
  plugins: [],
};
export default config;