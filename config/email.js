require('dotenv').config({ path: 'variables.env' })

module.exports = {
	user: process.env.MAIL_USER,
	pass: process.env.MAIL_PASSWORD,
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT
}
