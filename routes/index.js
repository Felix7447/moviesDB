const { Router } = require('express')

const movieRouter = require('./movies.route.js')

exports.routerAPI = ({ app, controller }) => {
  const { movies } = controller

  const router = Router()
  app.use('/api/v1/', router)
  router.use('/movies', movieRouter(movies))
}
