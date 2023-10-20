import { Router } from 'express'
import { MovieController } from '../controllers/movies.controllers.js'

const router = Router()

router.get('/', MovieController.getAll)
router.get('/:id', MovieController.getById)

export default router
