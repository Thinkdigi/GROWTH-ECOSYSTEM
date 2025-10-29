import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1020",
        cyan: "#00C6FF",
        electric: "#7C3AED",
        orchid: "#9B5CF6",
        deepblue: "#061021",
      },
      backgroundImage: {
        "hero-grad":
          "radial-gradient(520px at 10% 20%, rgba(124,58,237,0.12), transparent 40%), radial-gradient(700px at 90% 10%, rgba(155,92,246,0.10), transparent 45%), linear-gradient(180deg,#02030a 0%, #071026 100%)",
        "hero-tilt": "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,198,255,0.04))",
      },
      boxShadow: {
        glow: "0 6px 30px rgba(124,58,237,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
