const { DataTypes } = require('sequelize')

const MovieGenresInit = (sequelize, movies, genres) => {
  const MovieGenresSchema = {
    MovieId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: movies,
        key: 'id'
      },
      validate: {
        isUUID: 4
      }
    },
    GenreId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: genres,
        key: 'id'
      },
      validate: {
        notEmpty: true
      }
    }
  }

  const MovieGenres = sequelize.define('MovieGenres', MovieGenresSchema, {
    timestamps: false
  })

  return MovieGenres
}

module.exports = { MovieGenresInit }
