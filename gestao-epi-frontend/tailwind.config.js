/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#1b6ec2",
          primaryDark: "#1861ac",
          link: "#0077cc",
          border: "#e5e5e5",
          white: "#fff",
        },
      },
    },
  },
  plugins: [],
};
