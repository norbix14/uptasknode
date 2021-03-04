const nodemailer = require('nodemailer')
const pug = require('pug')
const juice = require('juice')
const { htmlToText } = require('html-to-text')
const util = require('util')
const emailConfig = require('../config/email')

const { host, port, user, pass } = emailConfig

let transport = nodemailer.createTransport({
	host,
	port,
	auth: {
		user,
		pass
	}
})

/**
 * Funcion que genera HTML
 * 
 * @param {string} file - name of the file to render
 * @param {object} opts - configuration object
*/
const genHtml = (file, opts = {}) => {
	const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, opts)
	return juice(html)
}

/**
 * Funcion para enviar un mail
 * 
 * @param {object} opts - a configuration object to send emails
 * @param {string} opts.archivo - file to render
 * @param {object} opts.usuario - user data
 * @param {string} opts.subject - mail subject
 * @param {string} opts.resetUrl - url to redirect
*/
exports.enviar = async opts => {
	const html = genHtml(opts.archivo, opts)
	const text = htmlToText(html)
	const mailOpts = {
		from: 'UptaskNode <no-reply@uptasknode.com>',
		to: opts.usuario.email,
		subject: opts.subject,
		text,
		html
	}
	const sendMail = util.promisify(transport.sendMail, transport)
	return sendMail.call(transport, mailOpts)
}
