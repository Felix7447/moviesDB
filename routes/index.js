import { Router } from 'express'
import movies from './movies.route.js'

export const routerAPI = (app) => {
  const router = Router()
  app.use('/api/v1/', router)
  router.use('/movies', movies)
}
