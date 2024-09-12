/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary' : '#66e888',
      'dark-primary' : '#44c666',
      'secondary' : '#6688e8',
      'black' : '#000000',
      'white' : '#ffffff',
      'gray' : '#666666',
      'light-gray' : '#eeeeee',
      'light-red' : '#eec6cc',
    },
    extend: {},
  },
  plugins: [],
}

