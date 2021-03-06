import { QiitaArticle } from './qiita'

export type RenderOptions = {
  username: string
  articles: QiitaArticle[]
  time: string
}

export function render({ username, articles, time }: RenderOptions) {
  const articleData = articles
    .map(
      article => `
  <entry>
    <id>tag:qiita-feed-gen.potato4d.me,2017:WatchEvent/${article.id}</id>
    <published>${article.created_at}</published>
    <updated>${article.updated_at}</updated>
    <link type="text/html" rel="alternate" href="${article.url}"/>
    <title type="html">${article.title}</title>
    <author>
      <name>${article.user.id}</name>
      <uri>https://qiita.com/${article.user.id}</uri>
    </author>
    <media:thumbnail height="30" width="30" url="${article.icon_url}"/>
    <content type="text">${article.description}</content>
  </entry>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xml:lang="en-US">
  <id>tag:qiita-feed-gen.potato4d.me,2017:/${username}.private</id>
  <link type="text/html" rel="alternate" href="https://qiita.com/${username}"/>
  <link type="application/atom+xml" rel="self" href="https://qiita-feed-gen.potato4d.me/${username}.private.atom"/>
  <title>Qiita Feed for ${username}</title>
  <updated>${time}</updated>${articleData}
</feed>`
}
