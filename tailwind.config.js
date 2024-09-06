/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import forms from "@tailwindcss/forms";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  mode: "jit",
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
  plugins: [daisyui, forms],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6B705C",

          secondary: "#A5A58D",

          accent: "#DDBEA9",

          neutral: "#FFE8D6",

          "base-100": "#FFFCF8",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#00ff00",

          error: "#ff0000",
        },
      },
    ],
  },
};
