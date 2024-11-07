import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple-main": "#702DFF",
        "purple-sec": "rgba(112, 45, 255, 0.2)",
        "purple-pale": "rgba(112,45,255,0.08)",
        "white": "#ffffff",
        "grey-100": "#202020"
      }
    },

  },
  plugins: [],
};
export default config;
