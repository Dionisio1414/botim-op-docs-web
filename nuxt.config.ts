export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/mdc', '@nuxtjs/sitemap', '@nuxt/eslint'],

  css: ['~/assets/css/main.css'],

  mdc: {
    highlight: {
      theme: { light: 'github-light', dark: 'github-dark' },
      langs: ['js', 'ts', 'vue', 'html', 'css', 'bash', 'json', 'yaml', 'java', 'python', 'go'],
    },
  },

  app: {
    head: {
      title: 'Botim OP Docs',
      meta: [
        { name: 'description', content: 'Official documentation for Botim Open Platform. Guides, API reference, and examples.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },

  site: {
    url: import.meta.env.NUXT_PUBLIC_SITE_URL || 'https://docs.botim-op.com',
  },

  sitemap: {
    exclude: ['/admin/**', '/account/**', '/tickets/**', '/login', '/register'],
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '/api',
    },
  },

  future: { compatibilityVersion: 4 },
  compatibilityDate: '2025-01-01',

  routeRules: {
    '/': { prerender: true },
    '/account/**': { ssr: true, robots: false },
    '/tickets/**': { ssr: false, robots: false },
    '/admin/**': { ssr: false, robots: false },
    '/login': { robots: false },
    '/register': { robots: false },
  },
})