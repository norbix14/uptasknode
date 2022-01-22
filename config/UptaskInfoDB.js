require('dotenv').config()

/**
 * Modulo que exporta un objeto con datos
 * de la base de datos como su nombre,
 * puerto, host, dialecto, usuario y contraseña
 *
 * @module config/UptaskInfoDB
 */

module.exports = {
  database: process.env.BD_NOMBRE,
  user: process.env.BD_USER,
  password: process.env.BD_PASS,
  host: process.env.BD_HOST,
  dialect: 'mysql',
  port: process.env.BD_PORT,
}
