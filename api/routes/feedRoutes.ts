import { Qiita } from '../../core/qiita'
import { render } from '../../core/render'
import { sortBy } from 'lodash'
import { Request, Response } from 'express'
import dayjs from 'dayjs'

export async function getPersonalFeed(req: Request, res: Response) {
  try {
    if (
      req.params.user.indexOf('.atom') != req.params.user.length - 5 ||
      !('token' in req.query)
    ) {
      res.status(422).send('invalid')
    }
    let { user } = req.params
    const { token } = req.query
    const username = user.replace('.atom', '')
    const api = new Qiita({ token, username })
    let articles = await api.getFollowingTagsArticles()
    const xml = render({
      username,
      articles: sortBy(articles, ['unixtime']),
      time: dayjs().format()
    })
    res.header('Content-Type', 'application/atom+xml; charset=utf-8')
    res.write(xml)
    res.end()
  } catch (e) {
    res.status(400).send('invalid')
  }
}
