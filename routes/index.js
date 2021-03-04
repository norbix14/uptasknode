const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')

/**
 * Modulo que contiene el enrutamiento de la aplicacion
 * 
 * @module routes/index
*/

module.exports = function() {
	/**** Rutas para los proyectos ****/
	// obtener todos los proyectos creados
	router.get('/',
		authController.usuarioAutenticado,
		proyectosController.proyectosHome
	)

	// mostrar formulario de nuevo proyecto
	router.get('/nuevo-proyecto',
		authController.usuarioAutenticado,
		proyectosController.formularioProyecto
	)

	// crear nuevo proyecto
	router.post('/nuevo-proyecto',
		authController.usuarioAutenticado,
	  body('nombre').not().isEmpty().trim().escape(),
	  proyectosController.nuevoProyecto
	)

	// listar proyectos
	router.get('/proyectos/:url',
		authController.usuarioAutenticado,
		proyectosController.proyectoPorUrl
	)
	
	// actualizar proyecto
	router.get('/proyecto/editar/:id',
	  authController.usuarioAutenticado,
	  proyectosController.formularioEditar
	)
	router.post('/nuevo-proyecto/:id',
	  authController.usuarioAutenticado,
	  body('nombre').not().isEmpty().trim().escape(),
	  proyectosController.actualizarProyecto
	)
	
	// eliminar proyecto
	router.delete('/proyectos/:url',
	  authController.usuarioAutenticado,
		proyectosController.eliminarProyecto
	)


	/**** Rutas para las tareas ****/
	// crear nueva tarea
	router.post('/proyectos/:url',
	  authController.usuarioAutenticado,
	  tareasController.agregarTarea
	)

	// actualizar tarea
	router.patch('/tareas/:id',
	  authController.usuarioAutenticado,
	  tareasController.cambiarEstadoTarea
	)

	// borrar tarea
	router.delete('/tareas/:id',
	  authController.usuarioAutenticado,
	  tareasController.eliminarTarea
	)


	/** Rutas para las acciones de los usuarios **/
	// crear nueva cuenta y confirmarla
	router.get('/crear-cuenta',
		usuariosController.formCrearCuenta
	)
	router.post('/crear-cuenta',
		usuariosController.crearCuenta
	)

	// iniciar sesion
	router.get('/iniciar-sesion',
		usuariosController.formIniciarSesion
	)
	router.post('/iniciar-sesion',
		authController.autenticarUsuario
	)

	// cerrar sesion
	router.get('/cerrar-sesion',
		authController.cerrarSesion
	)

	return router
}
