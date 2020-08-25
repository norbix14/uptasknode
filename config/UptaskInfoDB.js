require('dotenv').config({ path: 'variables.env' })

module.exports = {
	database: process.env.BD_NOMBRE,
	user: process.env.BD_USER,
	password: process.env.BD_PASS,
	host: process.env.BD_HOST,
	dialect: 'mysql',
	port: process.env.BD_PORT
}
