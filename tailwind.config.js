/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          default: '#2563eb',  
          dark: '#1f2937',    
        },
      },
    },
  },
  plugins: [],
}

