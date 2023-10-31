const init = require('./index')
const MovieModel = require('./models/mysql/movie.model')
const MovieController = require('./controllers/movies.controllers')

const movieController = new MovieController(MovieModel)

const controllers = {
  movies: movieController
}

init(controllers)
