import express from 'express'
import * as feedRoutes from './routes/feedRoutes'

const app = express()

app.get('/feed/:user', feedRoutes.getPersonalFeed)

export const handler = app
