/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./views/*.{html,js,ejs}"],
  theme: {
    extend: {
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(86.88deg, #7D6AFF 1.38%, #FFB86C 64.35%, #FC2872 119.91%)",
        "secondary-gradient": "linear-gradient(86.88deg, #20E3B2, #2cccff)",
      },
    },
  },
  plugins: [],
};
