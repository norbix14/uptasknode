require('dotenv').config({ path: 'variables.env' })

/**
 * Configuraciones para el envio de emails.
 * Datos obtenidos de Mailtrap con la cuenta gratuita.
*/

module.exports = {
	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASSWORD,
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT
}
