module.exports = {
  darkMode: 'class',
  css: ['main.css'],
  theme: {
    extend: {
      colors: {
        'yn-blue': '#70c3c7',
        'yn-sky': '#7db3cd',
        'yn-dusk': '#608099',
        'yn-green': '#728d7c',
        'yn-lavender': '#b4adcc',
        'yn-sand': '#dcc2a7',
        'yn-cherry-blossom': '#f2dcdc',
        'yn-night-sky': '#12263A',
        'yn-sunset': '#FC7753',
        'yn-twilight': '#3c415e',
        'yn-golden': '#e0a890',
        'yn-deep-purple': '#412f52',
        'yn-soft-lilac': '#b4d3ea'
      },
      borderWidth: {
        '1': '1px'
      }
    }
  },
  variants: {},
  plugins: [],
  purge: [
    './components/**/*.vue',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.vue',
    './nuxt.config.{js,ts}',
    'app.vue'
  ]
};
