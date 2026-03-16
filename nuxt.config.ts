export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxt/content', '@nuxtjs/i18n'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      import('@tailwindcss/vite').then((m) => m.default()),
    ],
  },

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'FR', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'EN', file: 'en.json' },
    ],
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    langDir: '../i18n/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_lang',
      redirectOn: 'root',
    },
  },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', media: 'print', onload: "this.media='all'" },
      ],
    },
  },

  nitro: {
    preset: 'static',
    prerender: {
      routes: [],
      crawlLinks: true,
      failOnError: false,
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['javascript', 'json', 'bash', 'html', 'css', 'typescript', 'vue'],
        },
      },
    },
  },
})
