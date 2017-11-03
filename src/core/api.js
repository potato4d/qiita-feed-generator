import axios from 'axios'

class Api {
  constructor (credential, username) {
    this.username = username;
    axios.defaults.headers.common['Authorization'] = `Bearer ${credential}`;
    axios.defaults.baseURL = 'https://qiita.com/api/v2';
  }

  async getTaggedArticles () {
    try {
      const { data: tags } = await axios.get(`/users/${this.username}/following_tags`)
      let articles = await Promise.all(tags.map(async (tag) => {
        const { data: taggedArticles } = await axios.get(`/tags/${tag.id}/items?per_page=10`)
        return taggedArticles.map((article) => (
          {
            id: article.id,
            title: article.title,
            description: article.body.split("\n").slice(0,3).join('').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/, '&gt;'),
            url: article.url,
            created_at: article.created_at,
            updated_at: article.updated_at,
            icon_url: tag.icon_url,
            user: article.user
          }
        ))
      }))
      return articles.reduce((a, b)=>(a.concat(b)))
    } catch (err) {
      console.log(err)
      console.log('だめ')
    }
  }
}

export default Api
