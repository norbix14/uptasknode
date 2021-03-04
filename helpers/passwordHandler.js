const bcrypt = require('bcryptjs')

/**
 * Funcion para encriptar contraseña de manera
 * sincronica
 * 
 * @param {string} string - string to hash
 * @returns {string} contraseña encriptada
*/
exports.encryptPassword = (string) => {
	const salt = bcrypt.genSaltSync()
	const hashed = bcrypt.hashSync(string, salt)
	return hashed
}

/**
 * Funcion para comparar contraseña de manera
 * sincronica
 * 
 * @param {string} string - string to compare
 * @param {string} hash - hash to test against
 * @returns {boolean} true or false
*/
exports.comparePassword = (string, hash) => {
	const result = bcrypt.compareSync(string, hash)
	return result
}
