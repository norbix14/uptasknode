const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')

exports.formCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear nueva cuenta'
	})
}

exports.formIniciarSesion = (req, res) => {
	const { error } = res.locals.mensajes
	res.render('iniciarSesion', {
		nombrePagina: 'Iniciar sesión',
		error
	})
}

exports.crearCuenta = async (req, res) => {
	const { email, password } = req.body
	try {
		await Usuarios.create({
			email,
			password
		})
		const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`
		const usuario = { email }
		await enviarEmail.enviar({
			usuario,
			subject: 'Confirmar cuenta',
			confirmarUrl,
			archivo: 'confirmar-cuenta'
		})
		req.flash('correcto', 'Te enviamos un correo para que confirmes tu cuenta')
		res.redirect('/iniciar-sesion')
	} catch(error) {
		req.flash('error', error.errors.map(error => error.message))
		res.render('crearCuenta', {
			mensajes: req.flash(),
			nombrePagina: 'Crear nueva cuenta',
			email,
			password
		})
	}
}

exports.formReestablecerPassword = (req, res) => {
	res.render('reestablecer', {
		nombrePagina: 'Reestablecer contraseña'
	})
}

exports.confirmarCuenta = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			email: req.params.correo
		}
	})
	if(!usuario) {
		req.flash('error', 'Acción no válida')
		return res.redirect('/crear-cuenta')
	}
	usuario.activo = 1
	await usuario.save()
	req.flash('correcto', 'Cuenta confirmada y activada. Puedes iniciar sesión')
	res.redirect('/iniciar-sesion')
}
