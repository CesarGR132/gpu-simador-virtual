import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        cpu: {
          bg: "#e2e2e2",
          border: "#a0a0a0",
          text: "#333333",
        },
        bus: {
          data: "#0066cc",
          address: "#ff9900",
          control: "#cc0000",
        },
      },
      animation: {
        "data-flow": "data-flow 1s ease-in-out",
      },
      keyframes: {
        "data-flow": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
