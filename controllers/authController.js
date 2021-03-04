const Sequelize = require('sequelize')
const passport = require('passport')
const crypto = require('crypto')
const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')
const { encryptPassword } = require('../helpers/passwordHandler')
const Op = Sequelize.Op

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

/**
 * Funcion que envia un token para reestablecer la contraseña
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.enviarToken = async (req, res) => {
	try {
		const { email } = req.body
		const usuario = await Usuarios.findOne({
			where: {
				email
			}
		})
		if (!usuario) {
			req.flash('error', 'Este email no pertenece a ninguna cuenta')
			return res.redirect('/reestablecer')
		}
		usuario.token = crypto.randomBytes(20).toString('hex')
		usuario.expiracion = Date.now() + 3600000
		await usuario.save()
		const resetUrl = `${req.protocol}://${req.hostname}/reestablecer/${usuario.token}`
		await enviarEmail.enviar({
			usuario,
			subject: 'Reestablecer contraseña',
			resetUrl,
			archivo: 'resetPassword'
		})
		req.flash('correcto', 'Se envió un mensaje a tu correo')
		return res.redirect('/iniciar-sesion')
	} catch (err) {
		req.flash('error', 'Ha ocurrido un error')
		return res.redirect('/reestablecer')
	}
}

/**
 * Funcion que valida el token
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.validarToken = async (req, res) => {
	try {
		const { token } = req.params
		const usuario = await Usuarios.findOne({
			where: {
				token
			}
		})
		if (!usuario) {
			req.flash('error', 'Has realizado una acción no válida')
			return res.redirect('/reestablecer')
		}
		return res.render('resetPassword')
	} catch (err) {
		req.flash('error', 'Ha ocurrido un error')
		return res.redirect('/reestablecer')
	}
}

/**
 * Funcion para actualizar la contraseña
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.actualizarPassword = async (req, res) => {
	try {
		const { token } = req.params
		const usuario = await Usuarios.findOne({
			where: {
				token,
				expiracion: {
					[Op.gte]: Date.now()
				}
			}
		})
		if (!usuario) {
			req.flash('error', 'Token inválido y/o expirado')
			return res.redirect('/reestablecer')
		}
		const { password } = req.body
		usuario.password = encryptPassword(password)
		usuario.token = null
		usuario.expiracion = null
		await usuario.save()
		req.flash('correcto', 'Tu contraseña se reestableció correctamente')
		return res.redirect('/iniciar-sesion')
	} catch (err) {
		req.flash('error', 'Ha ocurrido un error')
		return res.redirect('/reestablecer')
	}
}
