export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/mdc',
  ],

  future: { compatibilityVersion: 4 },

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'bash', 'md', 'yaml', 'python'],
        },
      },
    },
  },

  mdc: {
    highlight: {
      langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'bash', 'md', 'yaml', 'python'],
    },
  },

  routeRules: {
    '/admin/**': { ssr: false },
  },

  runtimeConfig: {
    adminPassword: 'admin123',
  },

  vite: {
    optimizeDeps: {
      include: ['monaco-editor'],
    },
  },
})
