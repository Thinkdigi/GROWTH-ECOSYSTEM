import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1020",
        cyan: "#00C6FF",
      },
      backgroundImage: {
        "hero-grad":
          "radial-gradient(600px at 20% 20%, rgba(0,198,255,0.15), transparent 60%), radial-gradient(700px at 80% 0%, rgba(0,198,255,0.12), transparent 60%)",
      },
    },
  },
  plugins: [],
};

export default config;
