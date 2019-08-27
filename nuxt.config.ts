import NuxtConfiguration from '@nuxt/config'
import { handler } from './api/handler'

const tmp = `
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Qiita Feed Gen - created by potato4d</title>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@potato4d" />
        <meta
          property="twitter:image"
          content="https://qiita-feed-gen.potato4d.me/ogp.png"
        />

        <meta property="og:url" content="https://qiita-feed-gen.potato4d.me" />
        <meta
          property="og:title"
          content="Qiita Feed Gen - created by potato4d"
        />
        <meta
          property="og:description"
          content="Qiita Feed Genは、QiitaのパーソナルフィードをRSS化するためのサービスです"
        />
        <meta
          property="og:image"
          content="https://qiita-feed-gen.potato4d.me/ogp.png"
        />

        <meta
          name="description"
          content="Qiita Feed Genは、QiitaのパーソナルフィードをRSS化するためのサービスです"
        />
        <meta name="keywords" content="Qiita,RSS" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-63818166-19"
        />
      </Head>
`

const config: NuxtConfiguration = {
  head: {
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.ico'},
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },
  css: [
    '~/static/style.css'
  ],
  serverMiddleware: [
    {
      path: 'feed/',
      handler
    }
  ]
}

export default config
