/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eafaf3',
          100: '#c8f0dd',
          200: '#93e0bd',
          300: '#5ecb9d',
          400: '#2fae7f',
          500: '#0e9e6d', // primary CTA green
          600: '#0a8a5c',
          700: '#0d6b49', // deep teal-green (headings)
          800: '#0b5540',
          900: '#0a4436',
        },
        ink: '#0f2a22',
        mist: '#eaf5f1', // page background tint
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 24px -8px rgba(13, 107, 73, 0.18)',
      },
    },
  },
  plugins: [],
}
