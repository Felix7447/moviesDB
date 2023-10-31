const { createMovieSchema, updateMovieSchema } = require('../schemas/movie.schema.js')

class MovieController {
  constructor (movieModel) {
    this.MovieModel = movieModel
  }

  getAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.MovieModel.getAll({ genre })
    res.json(movies)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const movie = await this.MovieModel.getById({ id })
    res.json(movie)
  }

  createMovie = async (req, res) => {
    try {
      const result = createMovieSchema(req.body)

      if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const newMovie = await this.MovieModel.createMovie({ data: result.data })

      res.status(201).json(newMovie)
    } catch (err) {
      console.error(err.message)
    }
  }

  updateMovie = async (req, res) => {
    try {
      const { id } = req.params
      const result = updateMovieSchema(req.body)

      if (!result.success) {
        res.status(400).json({ error: JSON.parse(result.error.message) })
      }

      const updatedMovie = await this.MovieModel.updateMovie({ id, data: result.data })

      res.json(updatedMovie)
    } catch (error) {
      console.error(error.message)
    }
  }

  deleteMovie = async (req, res) => {
    const { id } = req.params
    const deletedMovie = await this.MovieModel.deleteMovie({ id })
    res.json(deletedMovie)
  }
}

module.exports = MovieController
