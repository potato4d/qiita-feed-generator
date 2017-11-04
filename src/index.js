import express from 'express'
import { render } from './core/render'
import Api from './core/api'
import { sortBy } from 'lodash'

const app = express()

app.get('/feed/:user', async (req, res) => {
  if (
    (req.params.user.indexOf('.atom') != req.params.user.length-5) ||
    !('token' in req.query)
  ) {
    res.send('invalid');
  }
  let { user } = req.params
  const { token } = req.query
  user = user.replace('.atom', '')

  const api = new Api(token, user)
  let articles = await api.getTaggedArticles()
  articles = sortBy(articles, ['unixtime']).reverse()
  const xml = render(user, articles)

  res.header('Content-Type', 'application/atom+xml; charset=utf-8')
  res.write(xml)
  res.end()
})

app.use(express.static('public'))

const server = app.listen( process.env.PORT || 3000, process.env.HOST || '0.0.0.0', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`)
})
