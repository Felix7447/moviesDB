import { createConnection } from 'mysql2/promise'
import crypto from 'node:crypto'

const config = {
  host: 'localhost',
  user: 'root',
  port: '3310',
  password: 'felix',
  database: 'moviesdb'
}

const connection = await createConnection(config)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT * FROM genre WHERE LOWER(name) = ?;', [lowerGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      const [filteredMovies] = await connection.query(
        `SELECT BIN_TO_UUID(id) id, title, year, duration, poster, rate 
        FROM movies 
        INNER JOIN (SELECT movie_id FROM movie_genres WHERE genre_id = ?) AS movie_ids
        ON movies.id = movie_ids.movie_id;`, [id]
      )

      return filteredMovies
    }

    const [movies] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, duration, poster, rate
      FROM movies;`
    )

    const [getGenres] = await connection.query(
      `SELECT BIN_TO_UUID(movie_id) movie_id, title, name AS genre 
      FROM movie_genres 
      INNER JOIN movies ON movie_genres.movie_id = movies.id
      INNER JOIN genre ON movie_genres.genre_id = genre.id;`
    )

    const response = movies.map(movie => {
      const movieGenres = []

      getGenres.forEach(genre => {
        if (genre.movie_id === movie.id) {
          movieGenres.push(genre.genre)
        }
      })

      return {
        ...movie,
        genre: movieGenres
      }
    })

    return response
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, duration, poster, rate 
      FROM movies
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movie.length === 0) return []

    const [getGenres] = await connection.query(
      `SELECT name FROM (SELECT BIN_TO_UUID(movie_id) movie_id, genre_id 
      FROM movie_genres WHERE movie_genres.movie_id = UUID_TO_BIN(?)) 
      AS customTable INNER JOIN genre ON customTable.genre_id = genre.id;`,
      [id]
    )

    const movieGenres = getGenres.map(
      genre => genre.name
    )

    return {
      ...movie[0],
      genre: movieGenres
    }
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

    const uuid = crypto.randomUUID()

    await connection.query(
      `INSERT INTO movies (id, title, year, director, duration, poster, rate)
      VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?)`,
      [title, year, director, duration, poster, rate]
    )

    const [getGenreIDs] = await connection.query(
      `SELECT id FROM genre
      WHERE name IN (?)`,
      [genre]
    )

    const genreIDs = getGenreIDs.map(element => element.id)

    let createMovieGenreQuery = 'INSERT INTO movie_genres (movie_id, genre_id) VALUES'

    genreIDs.forEach((element, index) => {
      createMovieGenreQuery += `(UUID_TO_BIN("${uuid}"), ${element})`
      if (genreIDs.length - 1 !== index) {
        createMovieGenreQuery += ','
      }
    })

    await connection.query(createMovieGenreQuery)

    const [movie] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, title, year, duration, poster, rate
      FROM movies
      WHERE id = UUID_TO_BIN("${uuid}");`
    )

    return movie
  }

  static async updateMovie ({ id, data }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate
    } = data

    let updateQuery = ''

    if (title) {
      updateQuery += `title = '${title}',`
    }

    if (year) {
      updateQuery += `year = '${year}',`
    }

    if (director) {
      updateQuery += `director = '${director}',`
    }

    if (duration) {
      updateQuery += `duration = '${duration}',`
    }

    if (poster) {
      updateQuery += `poster = '${poster}',`
    }

    if (rate) {
      updateQuery += `rate = '${rate}',`
    }

    if (updateQuery.length > 0) {
      if (updateQuery[updateQuery.length - 1] === ',') {
        updateQuery = updateQuery.slice(0, -1)
      }

      await connection.query(
        `UPDATE movies
        SET ${updateQuery}
        WHERE id = UUID_TO_BIN(?);`,
        [id]
      )
    }

    const [movie] = await connection.query(
      `SELECT * FROM movies
      WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (movie.length === 0) return []

    return movie
  }

  static async deleteMovie ({ id }) {
    const [movie] = await connection.query(
      `DELETE FROM movies
      WHERE BIN_TO_UUID(id) = ?`,
      [id]
    )

    return movie
  }
}
