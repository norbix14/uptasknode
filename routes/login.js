const { Router } = require('express')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')

const router = Router()

/**
 * Modulo encargado del enrutamiento al iniciar sesion
 * 
 * @module routes/login
*/

/**
 * Maneja el enrutamiento al iniciar sesion 
*/
module.exports = function () {
	/*
	 * /iniciar-sesion
	*/
	// mostrar formulario
	router.get('/',
		usuariosController.formIniciarSesion
	)
	// autenticar usuario
	router.post('/',
		authController.autenticarUsuario
	)
  return router
}
