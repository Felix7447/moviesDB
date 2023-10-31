const { Router } = require('express')

const MovieController = require('../controllers/movies.controllers.js')

const router = Router()

router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getById)
router.post('/', MovieController.createMovie)
router.patch('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router
