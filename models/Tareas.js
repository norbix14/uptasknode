const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyectos = require('./Proyectos')

/**
 * Modulo que contiene el modelo de las tareas
 *
 * @module models/Tareas
*/

const Tareas = db.define('tareas', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true
	},
	tarea: {
		type: Sequelize.STRING(100)
	},
	estado: {
		type: Sequelize.INTEGER(1)
	}
})

Tareas.belongsTo(Proyectos)

module.exports = Tareas
