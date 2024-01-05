// https://tailwindcss.com/docs/using-with-preprocessors
// https://tailwindcss.com/docs/using-with-preprocessors#nesting **somewhere before Tailwind**
export default {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    // FIXME: Minified???
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
}
