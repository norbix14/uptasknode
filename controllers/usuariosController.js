const Usuarios = require('../models/Usuarios')
// const enviarEmail = require('../handlers/email')

/**
 * Funcion para renderizar el formulario para crear una cuenta
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.formCrearCuenta = (req, res) => {
	return res.render('crearCuenta', {
		nombrePagina: 'Crear nueva cuenta'
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
	try {
		const { email, password } = req.body
		await Usuarios.create({
			email,
			password
		})
		/*
			Opcion para validar el correo
		*/
		/*
		const confirmarUrl = `${req.protocol}://${req.hostname}/confirmar/${email}`
		const usuario = { email }
		await enviarEmail.enviar({
			usuario,
			subject: 'Confirmar cuenta',
			confirmarUrl,
			archivo: 'confirmar-cuenta'
		})
		req.flash('correcto', 'Te enviamos un correo para que confirmes tu cuenta')
		return res.redirect('/iniciar-sesion')
		*/
		/*
			Opcion simple sin validar correo
		*/
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

/**
 * Funcion para renderizar un formulario para reestablecer contraseña
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.formReestablecerPassword = (req, res) => {
	return res.render('reestablecer', {
		nombrePagina: 'Reestablecer contraseña'
	})
}

/**
 * Funcion para confirmar la cuenta creada
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 */
exports.confirmarCuenta = async (req, res) => {
	try {
		const { correo: email } = req.params
		const usuario = await Usuarios.findOne({
			where: {
				email
			}
		})
		if (!usuario) {
			req.flash('error', 'Acción no válida')
			return res.redirect('/crear-cuenta')
		}
		usuario.activo = 1
		await usuario.save()
		req.flash('correcto', 'Cuenta confirmada y activada. Puedes iniciar sesión')
		return res.redirect('/iniciar-sesion')	
	} catch (err) {
		req.flash('error', 'Ha ocurrido un error')
		return res.redirect('/crear-cuenta')
	}
}
