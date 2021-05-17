const { Router } = require('express')
const tareasController = require('../controllers/tareasController')
const authController = require('../controllers/authController')

const router = Router()

/**
 * Modulo encargado del enrutamiento para las tareas
 * 
 * @module routes/tasks
*/

/**
 * Maneja el enrutamiento al crear tareas
*/
module.exports = function () {
	/*
	 * /tareas
	*/
	// actualizar tarea
	router.patch('/:id',
	  authController.usuarioAutenticado,
	  tareasController.cambiarEstadoTarea
	)
	// borrar tarea
	router.delete('/:id',
	  authController.usuarioAutenticado,
	  tareasController.eliminarTarea
	)
	return router
}
