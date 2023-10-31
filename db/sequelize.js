const { Sequelize } = require('sequelize')
const setupModels = require('./models/index')

const options = {
  host: 'localhost',
  port: '5432',
  username: 'felix',
  password: 'Felix123*',
  database: 'movies_db',
  dialect: 'postgres',
  logging: console.log
}

const sequelize = new Sequelize(options)

setupModels(sequelize)

module.exports = sequelize
