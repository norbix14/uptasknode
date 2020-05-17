const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuarios = require('../models/Usuarios')

/**
 * local strategy - login con credenciales propias (usuario y contraseña)
*/
passport.use(new LocalStrategy({
	// por defecto se espera un usuario y contraseña pero podemos
	// personalizarlo usando 'email y contraseña' en este caso
	usernameField: 'email',
	passwordField: 'password'
}, async (email, password, done) => {
	try {
		// referenciamos al modelo de Usuarios para autenticar
		const usuario = await Usuarios.findOne({
			where: {
				email,
				activo: 1
			}
		})
		// existe usuario pero la contraseña es incorrecta
		if(!usuario.verificarPassword(password)) {
			return done(null, false, { message: 'Error en la contraseña' })
		}
		// existe usuario y la contraseña es correcta
		return done(null, usuario)
	} catch(error) {
		// el usuario no existe
		return done(null, false, { message: 'Este email no existe' })
	}
}))

// serializar usuario
passport.serializeUser((usuario, callback) => {
	callback(null, usuario)
})

// deserializar usuario
passport.deserializeUser((usuario, callback) => {
	callback(null, usuario)
})

// exportar
module.exports = passport
