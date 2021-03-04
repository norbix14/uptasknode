const Sequelize = require('sequelize')
const UptaskInfoDB = require('./UptaskInfoDB')
const { database, user, password, host, dialect, port } = UptaskInfoDB

/**
 * Modulo para configurar la base de datos
 * 
 * @module config/db
*/

const db = new Sequelize(database, user, password, {
  host,
  dialect,
  port,
  define: {
  	timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
})

module.exports = db
