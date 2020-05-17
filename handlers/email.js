const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const htmlToText = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')

/**
 * crear transporte para los emails con 'host',
 * 'port', 'user' y 'pass' obtenidos de la cuenta
 * gratuita de Mailtrap
*/
let transport = nodemailer.createTransport({
	host: emailConfig.host,
	port: emailConfig.port,
	auth: {
		user: emailConfig.user,
		pass: emailConfig.pass
	}
})


/**
 * @param archivo es la plantilla usada para mostrar en el email enviado
 * @param opciones objecto con datos con los cuales Pug trabajara
 * @return compila la plantilla Pug proporcionada a una cadena HTML
*/
const generarHtml = (archivo, opciones = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/emails/${archivo}.pug`,
	                            opciones)
	return juice(html)
}


/**
 * @param opciones objecto con los datos del usuario a quien enviar el
 * email como 'email', 'subject' o motivo, 'text' texto con informacion
 * sobre los pasos a seguir o algun token y 'plantilla/html' que se 
 * usara para dar formato a los datos proporcionados
 * @return envia el email con los datos proporcionados
*/
exports.enviar = async opciones => {
	const html = generarHtml(opciones.archivo, opciones)
	const text = htmlToText.fromString(html)
	/**
	 * objeto con los parametros que son pasados a 'enviar' para
	 * poder enviar el email, tales como 'from', 'to', 'subject', 'text'
	 * y 'html' o plantilla que sera compilada para dar formato al email
	*/
	let opcionesEmail = {
		from: 'UptaskNode <no-reply@uptasknode.com>',
		to: opciones.usuario.email,
		subject: opciones.subject,
		text,
		html
	}
	const enviarEmail = util.promisify(transport.sendMail, transport)
	return enviarEmail.call(transport, opcionesEmail)
}


