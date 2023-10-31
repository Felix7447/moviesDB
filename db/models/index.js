const { MovieInit } = require('./movies')
const { GenreInit } = require('./genres')
const { MovieGenresInit } = require('./movieGenres')

const setupModels = async (sequelize) => {
  const Movies = MovieInit(sequelize)
  const Genres = GenreInit(sequelize)
  const MovieGenres = MovieGenresInit(sequelize, Movies, Genres)

  Movies.belongsToMany(Genres, { through: MovieGenres })
  Genres.belongsToMany(Movies, { through: MovieGenres })

  await sequelize.sync({ alter: true })

  // await Movies.create({
  //   title: 'The Felix Movie',
  //   year: 2020,
  //   director: 'Felix Reyna',
  //   duration: 90,
  //   poster: 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg'
  // })

  // await Genres.bulkCreate([
  //   { name: 'Action' },
  //   { name: 'Drama' },
  //   { name: 'Crime' },
  //   { name: 'Adventure' },
  //   { name: 'Sci-fi' },
  //   { name: 'Romance' }
  // ])
}

module.exports = setupModels
