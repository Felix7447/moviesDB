const { Router } = require('express')

const movieRouter = (movieController) => {
  const router = Router()

  router.get('/', movieController.getAll)
  router.get('/:id', movieController.getById)
  router.post('/', movieController.createMovie)
  router.patch('/:id', movieController.updateMovie)
  router.delete('/:id', movieController.deleteMovie)

  return router
}

module.exports = movieRouter
