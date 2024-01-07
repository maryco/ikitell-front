/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        white: 'rgb(var(--color-white) / 1)',
        black: 'rgb(var(--color-black) / 1)',
        gray: {
          base: 'rgb(var(--color-gray-base) / 1)',
          light: 'rgb(var(--color-gray-light) / 1)',
          dark: 'rgb(var(--color-gray-dark) / 1)',
          surface: 'rgb(var(--color-gray-surface) / 1)',
          'surface-dark': 'rgb(var(--color-gray-surface-dark) / 1)',
          outline: 'rgb(var(--color-gray-outline) / 1)',
        },
        primary: {
          0: 'rgb(var(--color-primary) / 1)',
          600: 'rgb(var(--color-primary-600) / 1)',
          900: 'rgb(var(--color-primary-900) / 1)',
        },
        secondary: {
          0: 'rgb(var(--color-secondary) / 1)',
          300: 'rgb(var(--color-secondary-300) / 1)',
          700: 'rgb(var(--color-secondary-700) / 1)',
        },
        error: 'rgb(var(--color-error) / 1)',
      },
      backgroundImage: {
        'sky-sm': "url('/images/bg_topSmall.png')",
        'sky-lg': "url('/images/bg_topLarge.png')",
      },
      padding: {
        'button-x': '42px',
      },
    },
  },
  plugins: [],
}
