const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Usuarios = require('../models/Usuarios')

/**
 * Modulo para configurar la autenticacion
 *
 * @module config/passport
 */

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const usuario = await Usuarios.findOne({
          where: {
            email,
            activo: 1,
          },
        })
        if (!usuario.verificarPassword(password)) {
          return done(null, false, {
            message: 'Credenciales incorrectas. Revisa tus datos',
            user: {
              email,
            },
          })
        }
        return done(null, usuario)
      } catch (error) {
        return done(null, false, {
          message: 'Este email no pertenece a ninguna cuenta',
          user: {
            email,
          },
        })
      }
    }
  )
)

passport.serializeUser((usuario, done) => {
  done(null, usuario)
})

passport.deserializeUser((usuario, done) => {
  done(null, usuario)
})

module.exports = passport
