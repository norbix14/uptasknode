const Sequelize = require('sequelize')
const passport = require('passport')
const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Op = Sequelize.Op
const enviarEmail = require('../handlers/email')

/**
 * autenticar usuario o redireccionar a 'iniciar-sesion' si no lo está
*/
exports.autenticarUsuario = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: 'iniciar-sesion',
	failureFlash: true,
	badRequestMessage: 'Campos obligatorios'
})


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * @param next continua el flujo de ejecucion
 * 
 * revisar si el usuario esta autenticado o sino redireccionar
 * a 'iniciar-sesion'
*/
exports.usuarioAutenticado = (req, res, next) => {
	// usuario autenticado
	if(req.isAuthenticated()) {
		return next()
	}
	// redirigir a iniciar-sesion si no esta autenticado
	return res.redirect('/iniciar-sesion')
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * cerrar la sesion y redireccionar a 'iniciar-sesion'
*/
exports.cerrarSesion = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/iniciar-sesion')
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * generar un token para reestablecer la contraseña si el usuario es valido
 * y le envia un correo con los pasos a seguir
*/
exports.enviarToken = async (req, res) => {
	// verificar que el usuario existe
	const usuario = await Usuarios.findOne({
		where: {
			email: req.body.email
		}
	})
	// el usuario no existe
	if(!usuario) {
		req.flash('error', 'Este email no existe')
		res.redirect('/reestablecer')
	}
	// el usuario existe asi que genero los datos de la recuperacion
	usuario.token = crypto.randomBytes(20).toString('hex')
	usuario.expiracion = Date.now() + 3600000
	// guardar datos del token de recuperacion
	await usuario.save()
	// url de reestablecimiento
	const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`
	// envia el correo al usuario para reestablecer su contraseña
	await enviarEmail.enviar({
		usuario,
		subject: 'Reestablecer contraseña',
		resetUrl,
		archivo: 'resetPassword'
	})
	// terminar y avisarle al usuario
	req.flash('correcto', 'Se envió un mensaje a tu correo')
	res.redirect('/iniciar-sesion')
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * validar token y mostrar el formulario para reestablecer la contraseña
*/
exports.validarToken = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			token: req.params.token
		}
	})
	// si no existe el usuario o trata de cambiar la url
	if(!usuario) {
		req.flash('error', 'Has hecho una acción no válida')
		res.redirect('/reestablecer')
	}
	// formulario para reestablecer la contraseña
	res.render('resetPassword', {
		nombrePagina: 'Reestablecer la contraseña'
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * actualizar la contraseña en la base de datos y redireccionar
 * a 'iniciar-sesion'
*/
exports.actualizarPassword = async (req, res) => {
	// verificar token valido y fecha de expiracion (una hora)
	const usuario = await Usuarios.findOne({
		where: {
			token: req.params.token,
			expiracion: {
				[Op.gte]: Date.now()
			}
		}
	})
	// el token es invalido y/o expiro despues de una hora
	if(!usuario) {
		req.flash('error', 'Token inválido y/o expirado')
		res.redirect('/reestablecer')
	}
	// el usuario es valido y existe, encriptar la nueva contraseña
	// y limpiar token y expiracion
	usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	usuario.token = null
	usuario.expiracion = null
	// guardar nueva contraseña
	await usuario.save()
	req.flash('correcto', 'Tu contraseña se reestableció correctamente')
	res.redirect('/iniciar-sesion')
}


