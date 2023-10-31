'use strict'

const crypto = require('node:crypto')

const movieId = crypto.randomUUID()

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Movies', [{
      id: movieId,
      title: 'The Felix Movie',
      year: 2020,
      director: 'Felix Reyna',
      duration: 90,
      poster: 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg'
    }])
    await queryInterface.bulkInsert('Genres', [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Drama' },
      { id: 3, name: 'Crime' },
      { id: 4, name: 'Adventure' },
      { id: 5, name: 'Sci-fi' },
      { id: 6, name: 'Romance' }
    ])
    await queryInterface.bulkInsert('MovieGenres', [
      { MovieId: movieId, GenreId: 1 },
      { MovieId: movieId, GenreId: 2 },
      { MovieId: movieId, GenreId: 3 }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {})
    await queryInterface.bulkDelete('Genres', null, {})
    await queryInterface.bulkDelete('MovieGenres', null, {})
  }
}
