/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  safelist: [
    "rc-pagination-item",
    "rc-pagination-item-active",
    "rc-pagination-prev",
    "rc-pagination-next",
    "rc-pagination-disabled",
    "rc-pagination-options",
  ],
  plugins: [require("daisyui"), require("@tailwindcss/line-clamp")],
  daisyui: {
    themes: ["fantasy", "dracula"],
  },
};
