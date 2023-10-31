const { Sequelize } = require('sequelize')
const setupModels = require('./models/index')
const config = require('../config/config')

const options = {
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  dialect: 'postgres',
  logging: console.log
}

console.log(options)

const sequelize = new Sequelize(options)

setupModels(sequelize)

module.exports = sequelize
