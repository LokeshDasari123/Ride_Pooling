/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2CBEFF",
        "custom-blue": "#034A58",
        "cust-text-descrip": "#799397",
      },
    },
  },
  plugins: [],
};
