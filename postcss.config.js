export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // FIXME: Minified???
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {}),
  },
}
