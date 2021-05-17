const { Router } = require('express')
const { body } = require('express-validator')
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const authController = require('../controllers/authController')

const router = Router()

/**
 * Modulo encargado del enrutamiento al iniciar sesion
 * 
 * @module routes/projects
*/

/**
 * Maneja el enrutamiento de los proyectos
*/
module.exports = function () {
	/*
	 * /proyectos
	*/
	// mostrar formulario de nuevo proyecto
	router.get('/nuevo',
		authController.usuarioAutenticado,
		proyectosController.formularioProyecto
	)
	// crear nuevo proyecto
	router.post('/nuevo',
		authController.usuarioAutenticado,
	  body('nombre').not().isEmpty().trim().escape(),
	  proyectosController.nuevoProyecto
	)
	// listar proyectos
	router.get('/:url',
		authController.usuarioAutenticado,
		proyectosController.proyectoPorUrl
	)
	// mostrar formulario para actualizar proyecto
	router.get('/editar/:id',
	  authController.usuarioAutenticado,
	  proyectosController.formularioEditar
	)
	// editar el nombre del proyecto
	router.post('/editar/:id',
	  authController.usuarioAutenticado,
	  body('nombre').not().isEmpty().trim().escape(),
	  proyectosController.actualizarProyecto
	)
	// eliminar proyecto
	router.delete('/:url',
	  authController.usuarioAutenticado,
		proyectosController.eliminarProyecto
	)
	// crear nueva tarea
	router.post('/:url',
	  authController.usuarioAutenticado,
	  tareasController.agregarTarea
	)
	return router
}
