const next = require('next')
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const { createServer } = require('http')

const express = require('express')
const { render } = require('./server/core/render')
const Api = require('./server/core/api')
const morgan = require('morgan')
const { sortBy } = require('lodash')

const fallbackHandler = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()
    server.use(morgan())

    server.get('/', (req, res) => {
      app.render(req, res, '/', {})
    })

    server.get('/feed/:user', async (req, res) => {
      try {
        if (
          req.params.user.indexOf('.atom') != req.params.user.length - 5 ||
          !('token' in req.query)
        ) {
          res.send('invalid')
        }
        let { user } = req.params
        const { token } = req.query
        user = user.replace('.atom', '')
        console.log(Api)
        const api = new Api(token, user)
        let articles = await api.getTaggedArticles()
        articles = sortBy(articles, ['unixtime']).reverse()
        const xml = render(user, articles)

        res.header('Content-Type', 'application/atom+xml; charset=utf-8')
        res.write(xml)
        res.end()
      } catch (e) {
        res.send('invalid')
      }
    })

    server.get('*', (req, res) => {
      return fallbackHandler(req, res)
    })

    server.listen(process.env.PORT || 3000, err => {
      if (err) throw err
    })
  })
  .catch(e => {
    console.error(e)
  })
