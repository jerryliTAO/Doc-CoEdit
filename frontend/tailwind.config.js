/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,vue}"],
  theme: {
    extend: {
      screens: {
        tablet: '900px'
      },
      backgroundImage: {
        'login': "url('@/images/document.jpg')"
      },
      width: {
        "0.2lvw": "20lvw",
        "1xl": "800px",
        "lg": "640px",
        "md": "360px",
        "800": "800px",
        "900": "900px",
        "1000": "1000px",
        "8.5in": "8.5in",
      },
      height: {
        "1000": "1000px",
        "8.5in": "8.5in"
      },
      minHeight: {
        "11in": "11in",
      },
      animation: {
        fade: 'fadeOut 1s ease-in-out'
      },
      keyframes: {
        fadeOut: {
          '0%': { left: -300 },
          '100%': { left: 0 }
        }
      },
      gridTemplateColumns: {
        "G_driver": "repeat(auto-fill,minmax(240px,1fr))"
      },
    },
  },
  plugins: [],
}