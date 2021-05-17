const { Router } = require('express')
const proyectosController = require('../controllers/proyectosController')
const authController = require('../controllers/authController')

const router = Router()

/**
 * Modulo encargado del enrutamiento al inicio
 * 
 * @module routes/home
*/

/**
 * Maneja las rutas al inicio
*/
module.exports = function () {
	/*
	 * /
	 * obtener todos los proyectos
	*/
	router.get('/',
		authController.usuarioAutenticado,
		proyectosController.proyectosHome
	)
	return router
}
