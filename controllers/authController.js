const Sequelize = require('sequelize')
const passport = require('passport')
const Usuarios = require('../models/Usuarios')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const Op = Sequelize.Op
const enviarEmail = require('../handlers/email')

exports.autenticarUsuario = passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: 'iniciar-sesion',
	failureFlash: true,
	badRequestMessage: 'Campos obligatorios'
})

exports.usuarioAutenticado = (req, res, next) => {
	if(req.isAuthenticated()) return next()
	return res.redirect('/iniciar-sesion')
}

exports.cerrarSesion = (req, res) => {
	req.session.destroy(() => {
		res.redirect('/iniciar-sesion')
	})
}

exports.enviarToken = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			email: req.body.email
		}
	})
	if(!usuario) {
		req.flash('error', 'Este email no pertenece a ninguna cuenta')
		return res.redirect('/reestablecer')
	}
	usuario.token = crypto.randomBytes(20).toString('hex')
	usuario.expiracion = Date.now() + 3600000
	await usuario.save()
	const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`
	await enviarEmail.enviar({
		usuario,
		subject: 'Reestablecer contraseña',
		resetUrl,
		archivo: 'resetPassword'
	})
	req.flash('correcto', 'Se envió un mensaje a tu correo')
	res.redirect('/iniciar-sesion')
}

exports.validarToken = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			token: req.params.token
		}
	})
	if(!usuario) {
		req.flash('error', 'Has realizado una acción no válida')
		return res.redirect('/reestablecer')
	}
	res.render('resetPassword')
}

exports.actualizarPassword = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			token: req.params.token,
			expiracion: {
				[Op.gte]: Date.now()
			}
		}
	})
	if(!usuario) {
		req.flash('error', 'Token inválido y/o expirado')
		return res.redirect('/reestablecer')
	}
	usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	usuario.token = null
	usuario.expiracion = null
	await usuario.save()
	req.flash('correcto', 'Tu contraseña se reestableció correctamente')
	res.redirect('/iniciar-sesion')
}
