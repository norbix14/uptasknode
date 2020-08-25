const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuarios = require('../models/Usuarios')

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	}, 
	async (email, password, done) => {
		try {
			const usuario = await Usuarios.findOne({
				where: {
					email,
					activo: 1
				}
			})
			if(!usuario.verificarPassword(password)) {
				return done(null, false, {
					message: 'Credenciales incorrectas. Revisa tus datos'
				})
			}
			return done(null, usuario)
		} catch(error) {
			return done(null, false, {
				message: 'Este email no pertenece a ninguna cuenta'
			})
		}
	}
))

passport.serializeUser((usuario, callback) => {
	callback(null, usuario)
})

passport.deserializeUser((usuario, callback) => {
	callback(null, usuario)
})

module.exports = passport
