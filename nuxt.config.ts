import { Configuration } from '@nuxt/types'
import { handler } from './api/handler'

const config: Configuration = {
  head: {
    title: 'Qiita Feed Generator - created by potato4d',
    meta: [
      { property: 'twitter:card', content: 'summary' },
      { property: 'twitter:site', content: '@potato4d' },
      {
        property: 'twitter:image',
        content: 'https://qiita-feed-gen.potato4d.me/ogp.png'
      },
      { property: 'og:title', content: 'Qiita Feed Generator - created by potato4d' },
      { property: 'og:url', content: 'https://qiita-feed-gen.potato4d.me"' },
      { property: 'og:title', content: 'Qiita Feed Generator - created by potato4d' },
      {
        property: 'og:description',
        content:
          'Qiita Feed Generator は、QiitaのパーソナルフィードをRSS化するためのサービスです。'
      },
      {
        property: 'og:image',
        content: 'https://qiita-feed-gen.potato4d.me/ogp.png'
      },
      { name: 'keywords', content: 'Qiita,RSS' },
      {
        name: 'description',
        content:
          'Qiita Feed Generator は、QiitaのパーソナルフィードをRSS化するためのサービスです。'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
      }
    ],
    script: [
      {
        async: true,
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-63818166-19'
      }
    ]
  },
  css: ['~/assets/style.css'],
  serverMiddleware: [
    {
      path: 'feed/',
      handler
    }
  ],
  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true
      }
    ]
  ]
}

export default config
