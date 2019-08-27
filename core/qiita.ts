import axios from 'axios'
import dayjs from 'dayjs'

export type QiitaUser = {
  id: string
}

export type QiitaTag = {
  id: string
  icon_url: string
}

export type QiitaArticle = {
  id: string,
  body: string,
  title: string,
  description: string,
  url: string,
  unixtime: number,
  created_at: string,
  updated_at: string,
  icon_url: string,
  user: QiitaUser
}


export class Qiita {
  private username: string

  constructor({token, username}: {token: string, username: string}) {
    this.username = username
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    axios.defaults.baseURL = 'https://qiita.com/api/v2'
  }

  async getFollowingTagsArticles(): Promise<QiitaArticle[]> {
    try {
      const { data: tags }: { data: QiitaTag[] } = await axios.get(
        `/users/${this.username}/following_tags`
      )
      let articlesByTags = await Promise.all(
        tags.map(async tag => {
          const { data: taggedArticles }: { data: QiitaArticle[] } = await axios.get(
            `/tags/${tag.id}/items?per_page=10`
          )
          const articles = taggedArticles.map(article => ({
            id: article.id,
            title: article.title
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/, '&gt;'),
            description: article.body
              .split('\n')
              .slice(0, 3)
              .join('')
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/, '&gt;'),
            url: article.url,
            unixtime: dayjs(article.created_at).unix(),
            created_at: article.created_at,
            updated_at: article.updated_at,
            icon_url: tag.icon_url,
            user: article.user
          }))
          return articles as QiitaArticle[]
        })
      )
      return articlesByTags.reduce((before, after) => ([
        ...before,
        ...after
      ]))
    } catch (err) {
      console.log(err)
      return Promise.reject()
    }
  }
}
