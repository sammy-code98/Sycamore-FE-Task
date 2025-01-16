/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sycamore-primary": "#66C267",
        "sycamore-danger": "#E24239",
        "sycamore-secondary": "#083042",
        "sycamore-orange": "#F1752E",
      },
    },
  },
  plugins: [],
};
