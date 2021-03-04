require('dotenv').config()

/**
 * Modulo para configurar las opciones del mail
 * para validar y confirmar la cuenta
 * 
 * @module config/email
*/

module.exports = {
	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASSWORD,
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT
}
