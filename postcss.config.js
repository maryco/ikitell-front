// https://tailwindcss.com/docs/using-with-preprocessors
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'tailwindcss/nesting': {},
    // FIXME: Minified???
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
}
