const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyectos = require('../models/Proyectos')
const bcrypt = require('bcrypt')

/**
 * Se comunica con la base de datos y crea la tabla
 * para insertar los usuarios con los campos de
 * 'id', 'email', 'password', 'activo', 'token' y 'expiracion'.
*/
const Usuarios = db.define('usuarios', {
	id: {
		type: Sequelize.INTEGER(11),
		primaryKey: true,
		autoIncrement: true
	},
	email: {
		type: Sequelize.STRING(60),
		allowNull: false,
		validate: {
			isEmail: {
				msg: 'Agregar un correo válido'
			},
			notEmpty: {
				msg: 'El email no puede estar vacío'
			}
		},
		unique: {
			args: true,
			msg: 'Este email ya está registrado'
		}
	},
	password: {
		type: Sequelize.STRING(60),
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'La contraseña no puede estar vacía'
			}
		}
	},
	activo: {
		type: Sequelize.INTEGER(1),
		defaultValue: 0
	},
	token: {
		type: Sequelize.STRING(255)
	},
	expiracion: {
		type: Sequelize.DATE
	}
}, {
	hooks: {
		beforeCreate(usuario) {
			usuario.password = bcrypt.hashSync(usuario.password,
			                                   bcrypt.genSaltSync(10))
		}
	}
})

/**
 * @return retorna la verificacion de la contraseña del usuario: 'true/false'
*/
Usuarios.prototype.verificarPassword = function(password) {
	return bcrypt.compareSync(password, this.password)
}

Usuarios.hasMany(Proyectos)

module.exports = Usuarios
