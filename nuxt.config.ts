// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", '@pinia/nuxt', ["@nuxtjs/google-fonts", {
    families: {
      Lato: {
        wght: [100, 300, 400, 700, 900],
        ital: [100, 300, 400, 700, 900]
      }
    }
  }], "@nuxt/eslint", 'nuxt-swiper'],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  css: ['~/assets/css/main.css'],
})