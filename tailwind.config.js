/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '327px',
      },
      colors: {
        white: 'rgb(var(--color-white) / 1)',
        black: 'rgb(var(--color-black) / 1)',
        gray: {
          base: 'rgb(var(--color-gray-base) / 1)',
          light: 'rgb(var(--color-gray-light) / 1)',
          bright: 'rgb(var(--color-gray-bright) / 1)',
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
        warning: 'linear-gradient(180deg, #c27272 0%, #6b6b6b 63%)',
      },
      padding: {
        'button-x': '8px',
        'container-x': '10px',
      },
    },
  },
  plugins: [],
}
