const Sequelize = require('sequelize')
const db = require('../config/db')
const slug = require('slug')
const { nanoid } = require('nanoid')

/**
 * Modulo que contiene el modelo de los Proyectos
 *
 * @module models/Proyectos
 */

const Proyectos = db.define(
  'proyectos',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(100),
    },
    url: {
      type: Sequelize.STRING(100),
    },
  },
  {
    hooks: {
      beforeCreate(proyecto) {
        const url = slug(proyecto.nombre).toLowerCase()
        proyecto.url = `${url}-${nanoid()}`
      },
    },
  }
)

module.exports = Proyectos
