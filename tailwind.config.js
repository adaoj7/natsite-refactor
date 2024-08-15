import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#6B705C",

        secondary: "#A5A58D",

        accent: "#DDBEA9",

        neutral: "#FFE8D6",

        "base-100": "#FFFCF8",
      },
    },
  },
  plugins: [daisyui],
};
