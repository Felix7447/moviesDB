const { Router } = require('express')

const movies = require('./movies.route.js')

exports.routerAPI = app => {
  const router = Router()
  app.use('/api/v1/', router)
  router.use('/movies', movies)
}
