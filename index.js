const express = require('express')
const routes = require('./routes')
const path = require('path')
const bodyParser = require('body-parser')
// const expressValidator = require('express-validator')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('./config/passport')
const helpers = require('./helpers')
const db = require('./config/db')
require('dotenv').config({ path: 'variables.env' })
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')
db.sync()
.then(() => console.log('Conectado a la Base de Datos'))
.catch(err => console.log('Error al conectar a la Base de Datos'))

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('view engine', 'pug')

// app.use(expressValidator())

app.set('views', path.join(__dirname, './views'))

app.use(flash())

app.use(cookieParser())

app.use(session({
	secret: 'sesionsecreta',
	resave: false,
	saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump
	res.locals.mensajes = req.flash()
	res.locals.usuario = { ...req.user } || null
	next()
})

app.use('/', routes())

app.listen(port, host, () => console.log(`Servidor en puerto ${port}`))
