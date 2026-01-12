/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    'node_modules/daisyui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
     backgroundImage: {
        'BGReg': "url('/src/assets/Backgrounds/RegBG.jpg')",
        'BGCreate': "url('/src/assets/Backgrounds/BGCreate.jpg')",
        'BGBlogs': "url('/src/assets/Backgrounds/BGBlogs.jpg')",
      },

    },
  },
  plugins: [require('daisyui')],
}

