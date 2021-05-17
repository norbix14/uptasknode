const express = require('express')

const home = require('./home')
const login = require('./login')
const logout = require('./logout')
const signup = require('./signup')
const projects = require('./projects')
const tasks = require('./tasks')

const app = express()

/**
 * Modulo que contiene el enrutamiento de la aplicacion
 * 
 * @module routes/index
*/

/**
 * Maneja las rutas de la aplicacion
*/
module.exports = function () {
	app.use('/', home())
	app.use('/crear-cuenta', signup())
	app.use('/iniciar-sesion', login())
	app.use('/cerrar-sesion', logout())
	app.use('/proyectos', projects())
	app.use('/tareas', tasks())
	return app
}
