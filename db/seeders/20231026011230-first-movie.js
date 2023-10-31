'use strict'

const { MOVIES_TABLE } = require('../models/movie.model')
const crypto = require('node:crypto')

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
    await queryInterface.bulkInsert(MOVIES_TABLE, [{
      id: crypto.randomUUID(),
      title: 'The Felix Movie',
      year: 2020,
      director: 'Felix Reyna',
      duration: 90,
      poster: 'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg'
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(MOVIES_TABLE, null, {})
  }
}
