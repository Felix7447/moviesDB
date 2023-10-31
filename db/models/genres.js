const { DataTypes } = require('sequelize')

const GenreInit = (sequelize) => {
  const genreSchema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      validate: {
        isInt: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isIn: ['Action', 'Drama', 'Crime', 'Adventure', 'Sci-fi', 'Romance']
      }
    }
  }

  const Genres = sequelize.define('Genre', genreSchema, {
    timestamps: false
  })

  return Genres
}

module.exports = { GenreInit }
