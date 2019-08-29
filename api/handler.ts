import express from 'express'
import * as feedRoutes from './routes/feedRoutes'

const app = express()

app.get('/:user', feedRoutes.getPersonalFeed)

export const handler = app
