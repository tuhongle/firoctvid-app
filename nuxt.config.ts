// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vue: {  
    compilerOptions: {
      isCustomElement: (tag) => [''].includes(tag),
    },
  },
  modules: ["@nuxt/ui", '@pinia/nuxt', ["@nuxtjs/google-fonts", {
    families: {
      Inter: {
        wght: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      }
    }
  }], "@nuxt/eslint", 'nuxt-swiper', "@nuxtjs/i18n", "nuxt-vuefire", '@vueuse/nuxt'],

  i18n: {
    vueI18n: './i18n.config.ts',
  },

  vuefire: {
    auth: {
      enabled: true
    },
    config: {
      apiKey: "AIzaSyANFAo2T8wjcq250FJ6e7r4x3zAi99-Syk",
      authDomain: "firoctvid.firebaseapp.com",
      projectId: "firoctvid",
      storageBucket: "firoctvid.appspot.com",
      messagingSenderId: "863791277241",
      appId: "1:863791277241:web:ff1ebf4c861e8d2d142768"
      // there could be other properties depending on the project
    },
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  css: ['~/assets/css/main.css'],
  plugins: ['~/plugins/veProgress.client.ts'],

  runtimeConfig: {
    public: {
      apibase: process.env.API_KEY,
      tokenapi: process.env.TOKEN_AUTH,
    }
  },

  compatibilityDate: "2024-07-09"
})