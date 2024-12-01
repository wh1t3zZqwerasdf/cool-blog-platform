/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1890ff',
          light: '#40a9ff',
          dark: '#096dd9',
        },
        success: {
          DEFAULT: '#52c41a',
          light: '#73d13d',
          dark: '#389e0d',
        },
        warning: {
          DEFAULT: '#faad14',
          light: '#ffc53d',
          dark: '#d48806',
        },
        error: {
          DEFAULT: '#f5222d',
          light: '#ff4d4f',
          dark: '#cf1322',
        },
      },
      spacing: {
        'header': '64px',
        'sidebar': '200px',
      },
    },
  },
  plugins: [],
}
