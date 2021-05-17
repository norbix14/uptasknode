const passport = require('passport')

/**
 * Modulo que contiene funciones y middlewares para todo
 * lo relacionado a la autenticacion y verificacion de
 * un usuario
 * 
 * @module controllers/authController
*/

/**
 * Middleware para autenticar al usuario mediante Passport
*/
exports.autenticarUsuario = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: 'iniciar-sesion',
	failureFlash: true,
	badRequestMessage: 'Campos obligatorios'
})

/**
 * Middleware que revisa si el usuario esta autenticado o no
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {Function} next - function to continue with the next middleware
*/
exports.usuarioAutenticado = (req, res, next) => {
	if(req.isAuthenticated()) return next()
	return res.redirect('/iniciar-sesion')
}

/**
 * Middleware que revisa si el usuario esta autenticado o no
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {Function} next - function to continue with the next middleware
*/
/*
exports.verificarAutenticacion = (req, res, next) => {
	if(!req.isAuthenticated()) return next()
	return res.redirect('/')
}
*/

/**
 * Funcion que cierra y destruye la sesion
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.cerrarSesion = (req, res) => {
	req.session.destroy(() => {
		return res.redirect('/iniciar-sesion')
	})
}
