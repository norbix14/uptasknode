const Sequelize = require('sequelize')
const db = require('../config/db')
const Proyectos = require('../models/Proyectos')
const {
  encryptPassword,
  comparePassword,
} = require('../helpers/passwordHandler')

/**
 * Modulo que contiene el modelo de los Usuarios
 *
 * @module models/Usuarios
 */

const Usuarios = db.define(
  'usuarios',
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Agregar un correo válido',
        },
        notEmpty: {
          msg: 'El email no puede estar vacío',
        },
      },
      unique: {
        args: true,
        msg: 'Este email ya está registrado',
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'La contraseña no puede estar vacía',
        },
      },
    },
    activo: {
      type: Sequelize.INTEGER(1),
      defaultValue: 1,
    },
    token: {
      type: Sequelize.STRING(255),
    },
    expiracion: {
      type: Sequelize.DATE,
    },
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = encryptPassword(usuario.password)
      },
    },
  }
)

/**
 * Funcion que verifica la contraseña
 *
 * @param {string} password - string to veriify
 * @returns {boolean} true or false
 */
Usuarios.prototype.verificarPassword = function (password) {
  return comparePassword(password, this.password)
}

Usuarios.hasMany(Proyectos)

module.exports = Usuarios
