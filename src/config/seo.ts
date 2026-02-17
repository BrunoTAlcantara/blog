export const seoConfig = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://brunotheodoro.com',

  siteName: 'Bruno Theodoro | I.A para devs',
  siteDescription: 'Blog sobre inteligencia artificial para desenvolvedores: fine-tuning, context window, arquitetura e codigo na pratica.',

  author: {
    name: 'Bruno Theodoro',
    email: 'dev.bruno.theodoro@gmail.com',
    url: 'https://brunotheodoro.com',
  },

  social: {
    twitter: '',
    github: 'https://github.com/brunotheodoro',
    linkedin: 'https://www.linkedin.com/in/brunotalcantara/',
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    yandex: '',
    yahoo: '',
  },

  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GTM_ID,
  },

  images: {
    logo: '/icon.svg',
    ogImage: '/og-image.jpg',
    favicon: '/icon.svg',
  },

  rss: {
    title: 'Bruno Theodoro | I.A para devs',
    description: 'Blog sobre inteligencia artificial para desenvolvedores.',
    language: 'pt-BR',
    copyright: `© ${new Date().getFullYear()} Bruno Theodoro.`,
  },
}

