require('dotenv').config()
const createError = require('http-errors')
const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const passport = require('./config/passport')
const db = require('./config/db')

const host = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT) || 3000

require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

db.sync()
.then(() => console.log('Conectado a la Base de Datos'))
.catch(err => console.log('Error al conectar a la Base de Datos'))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, './views'))

app.use(flash())

app.use(cookieParser())

app.use(session({
	secret: process.env.SESSION,
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	res.locals.mensajes = req.flash()
	res.locals.usuario = { ...req.user } || null
	next()
})

app.use('/', routes())

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.environment = req.app.get('env')
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	// render the error page
	res.status(err.status || 500)
	res.render('error', {
		title: '404 - Not found',
		nombrePagina: '404 - Not found'
	})
})

app.listen(port, host, () => console.log(`Servidor en puerto ${port}`))
