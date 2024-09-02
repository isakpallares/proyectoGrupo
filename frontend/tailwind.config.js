/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oscuro: "#a68dd1",
        medio: "#bca6dd",
        claro: "#d3bfe8",
        suave: "#e9d7f4",
        blanco: "#fff0ff",
      },
    },
  },
  plugins: [],
};
