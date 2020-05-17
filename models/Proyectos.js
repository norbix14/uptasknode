const Sequelize = require('sequelize')
const db = require('../config/db')
const slug = require('slug')
const shortid = require('shortid')

/**
 * Se comunica con la base de datos y crea la tabla
 * para insertar los proyectos con los campos de
 * 'id', 'nombre' y 'url'. Antes de insertarse,
 * a la 'url' se le agrega al final un identificador
 * para que sea unica.
*/
const Proyectos = db.define('proyectos', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: Sequelize.STRING(100)
	},
	url: {
		type: Sequelize.STRING(100)
	}
}, {
	hooks: {
		// acciones a realizar antes/despues de insertar en BBDD
		beforeCreate(proyecto) {
			const url = slug(proyecto.nombre).toLowerCase()
			proyecto.url = `${url}-${shortid.generate()}`
		}
	}
})

module.exports = Proyectos
