// nuxt.config.js
export default defineNuxtConfig({
  colorMode: {
    preference: 'light', // Force light mode
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  plugins: ['~/plugins/pinia.js'], // Register the Pinia plugin correctly
})
