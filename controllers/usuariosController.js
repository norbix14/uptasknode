const Usuarios = require('../models/Usuarios')
const enviarEmail = require('../handlers/email')

/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * mostrar el formulario para crear una nueva cuenta
*/
exports.formCrearCuenta = (req, res) => {
	res.render('crearCuenta', {
		nombrePagina: 'Crear nueva cuenta'
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * mostrar el formulario para iniciar sesion
*/
exports.formIniciarSesion = (req, res) => {
	const { error } = res.locals.mensajes
	res.render('iniciarSesion', {
		nombrePagina: 'Iniciar sesión',
		error
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * crear una nueva cuenta y redireccionar a 'iniciar-sesion'
*/
exports.crearCuenta = async (req, res) => {
	const { email, password } = req.body
	try {
		await Usuarios.create({
			email,
			password
		})
		// crear URL de confirmacion
		const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`
		// crear el objeto de usuario
		const usuario = { email }
		// enviar email
		await enviarEmail.enviar({
			usuario,
			subject: 'Confirmar cuenta',
			confirmarUrl,
			archivo: 'confirmar-cuenta'
		})
		// redirigir
		req.flash('correcto', 'Te enviamos un correo para que confirmes tu cuenta')
		res.redirect('/iniciar-sesion')
	} catch(error) {
		// genero un objeto de errores que da Sequelize
		req.flash('error', error.errors.map(error => error.message))
		res.render('crearCuenta', {
			// errores que envia Sequelize
			mensajes: req.flash(),
			nombrePagina: 'Crear nueva cuenta',
			email,
			password
		})
	}
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * mostrar el formulario para reestablecer la contraseña
*/
exports.formReestablecerPassword = (req, res) => {
	res.render('reestablecer', {
		nombrePagina: 'Reestablecer contraseña'
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 *
 * cambiar el estado de la cuenta de inactivo a activo
*/
exports.confirmarCuenta = async (req, res) => {
	const usuario = await Usuarios.findOne({
		where: {
			email: req.params.correo
		}
	})
	// el email no existe
	if(!usuario) {
		req.flash('error', 'Acción no válida')
		res.redirect('/crear-cuenta')
	}
	// el usuario existe
	usuario.activo = 1
	await usuario.save()
	req.flash('correcto', 'Cuenta confirmada y activada. Podes iniciar sesión')
	res.redirect('/iniciar-sesion')
}


