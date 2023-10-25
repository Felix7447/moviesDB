import { MovieModel } from '../models/local/movie.model.js'
import { createMovieSchema, updateMovieSchema } from '../schemas/movie.schema.js'

export class MovieController {
  static async getAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    res.json(movies)
  }

  static async getById (req, res) {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    res.json(movie)
  }

  static async createMovie (req, res) {
    try {
      const result = createMovieSchema(req.body)

      if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newMovie = await MovieModel.createMovie({ data: result.data })
      res.status(201).json(newMovie)
    } catch (err) {
      console.error(err.message)
    }
  }

  static async updateMovie (req, res) {
    try {
      const { id } = req.params
      const result = updateMovieSchema(req.body)

      if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const updatedMovie = await MovieModel.updateMovie({ id, data: result.data })

      res.json(updatedMovie)
    } catch (error) {
      console.error(error.message)
    }
  }

  static async deleteMovie (req, res) {
    const { id } = req.params
    const deletedMovie = await MovieModel.deleteMovie({ id })
    res.json(deletedMovie)
  }
}
