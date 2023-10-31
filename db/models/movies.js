const { DataTypes } = require('sequelize')

const MovieInit = (sequelize) => {
  const MovieSchema = {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1800,
        max: 2024
      }
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      isInt: true,
      min: 10
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    rate: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 5.0
    }
  }

  const Movies = sequelize.define('Movie', MovieSchema, {
    timestamps: false
  })

  return Movies
}

module.exports = { MovieInit }
