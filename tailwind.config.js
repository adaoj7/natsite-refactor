/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  mode: "jit",
  theme: {
    screens: {
      phone: "300px",
      // => @media (min-width: 640px) { ... }

      desktop: "800px",
      // => @media (min-width: 1024px) { ... }

      // 'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      Roboto: ['"Roboto Slab"', "serif"],
      OpenSans: ['"Open Sans"', "sans-serif"],
      Playfair: ['"Playfair Display"', "serif"],
      Montserrat: ['"Montserrat"', "sans-serif"],
      Dancing: ['"Dancing Script"', "cursive"],
    },
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
  plugins: [daisyui, forms, scrollbar],
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
    styled: true,
  },
};
