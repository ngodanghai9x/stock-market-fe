module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@setel/react-setel/dist/**/*.js",
  ],
};
