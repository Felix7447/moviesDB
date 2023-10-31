const { models } = require('../../db/sequelize')
const { Op } = require('sequelize')

class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const capGenre = genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()

      const movies = await models.Movie.findAll({
        include: {
          model: models.Genre,
          attributes: ['name'],
          through: { attributes: [] },
          where: {
            name: capGenre
          }
        }
      })
      return movies
    }

    const movies = await models.Movie.findAll({
      include: {
        model: models.Genre,
        attributes: ['name'],
        through: { attributes: [] }
      }
    })
    return movies
  }

  static async getById ({ id }) {
    if (!id) {
      return new Error('No id provided')
    }

    const movie = await models.Movie.findOne({
      where: { id },
      include: {
        model: models.Genre,
        attributes: ['name'],
        through: { attributes: [] }
      }
    })
    return movie
  }

  static async createMovie ({ data }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      genre,
      rate
    } = data

    const movie = await models.Movie.create({ title, year, director, duration, poster, rate })
    const { id } = movie

    const genreIDs = await models.Genre.findAll({
      attributes: ['id'],
      where: {
        name: {
          [Op.in]: genre
        }
      }
    })

    await genreIDs.forEach(element => {
      models.MovieGenres.create({ MovieId: id, GenreId: element.id })
    })

    return movie
  }

  static async updateMovie ({ id, data }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      genre,
      rate
    } = data

    const movie = await models.Movie.findOne({
      where: { id },
      include: {
        model: models.Genre,
        attributes: ['name'],
        through: { attributes: [] }
      }
    })
    await movie.update({ title, year, director, duration, poster, rate })

    if (genre) {
      const movieID = movie.id
      await models.MovieGenres.destroy({ where: { MovieId: movieID } })

      const genreIDs = await models.Genre.findAll({
        attributes: ['id'],
        where: {
          name: {
            [Op.in]: genre
          }
        }
      })

      await genreIDs.forEach(element => {
        models.MovieGenres.create({ MovieId: id, GenreId: element.id })
      })
    }

    return movie
  }

  static async deleteMovie ({ id }) {
    if (!id) {
      return new Error('You must provide an id')
    }

    await models.Movie.destroy({ where: { id } })
    return 'Movie Deleted'
  }
}

module.exports = MovieModel
