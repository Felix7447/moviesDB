'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('Movies', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        validate: {
          isUUID: 4
        }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1800,
          max: 2024
        }
      },
      director: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        isInt: true,
        min: 10
      },
      poster: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true
        }
      },
      rate: {
        type: Sequelize.DECIMAL(2, 1),
        allowNull: false,
        defaultValue: 5.0
      }
    })
    await queryInterface.createTable('Genres', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        validate: {
          isInt: true
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isIn: ['Action', 'Drama', 'Crime', 'Adventure', 'Sci-fi', 'Romance']
        }
      }
    })
    await queryInterface.createTable('MovieGenres', {
      MovieId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Movies',
          key: 'id'
        },
        validate: {
          isUUID: 4
        }
      },
      GenreId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Genres',
          key: 'id'
        },
        validate: {
          notEmpty: true
        }
      }
    })
  },
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('Movies')
    await queryInterface.dropTable('Genres')
    await queryInterface.dropTable('MovieGenres')
  }
}
