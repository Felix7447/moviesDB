const crypto = require('node:crypto')
const movies = require('../../movies.json')

class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    if (!movie) return false

    return movie
  }

  static async createMovie ({ data }) {
    const newMovie = {
      id: crypto.randomUUID(),
      ...data
    }
    movies.push(newMovie)
    return newMovie
  }

  static async updateMovie ({ id, data }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...data
    }

    return movies[movieIndex]
  }

  static async deleteMovie ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    const movie = movies.find(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)

    return movie
  }
}

module.exports = MovieModel
