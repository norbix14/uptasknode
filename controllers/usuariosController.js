const Usuarios = require('../models/Usuarios')

/**
 * Modulo que contiene funciones y middlewares para todo
 * lo relacionado al manejo de los usuarios
 *
 * @module controllers/usuariosController
*/

/**
 * Funcion para renderizar el formulario para crear una cuenta
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.formCrearCuenta = (req, res) => {
	return res.render('crearCuenta', {
		nombrePagina: 'Crear cuenta'
	})
}

/**
 * Funcion para renderizar el formulario para iniciar sesion
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.formIniciarSesion = (req, res) => {
	const { error = null } = res.locals?.mensajes
	return res.render('iniciarSesion', {
		nombrePagina: 'Iniciar sesión',
		error
	})
}

/**
 * Funcion para crear una cuenta
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.crearCuenta = async (req, res) => {
	const { email, password } = req.body
	try {
		await Usuarios.create({
			email,
			password
		})
		req.flash('correcto', 'Ya podes iniciar sesion y comenzar')
		return res.redirect('/iniciar-sesion')
	} catch(err) {
		req.flash('error', err.errors.map(error => error.message))
		return res.render('crearCuenta', {
			mensajes: req.flash(),
			nombrePagina: 'Crear nueva cuenta',
			email,
			password
		})
	}
}
