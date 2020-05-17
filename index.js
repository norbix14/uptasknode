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
// extraer valores de 'variables.env'
require('dotenv').config({ path: 'variables.env' })
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
// importo los modelos de bbdd para crear estructura con sync()
require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')
db.sync()
.then(() => console.log('>>>> Conectado a BBDD <<<<'))
.catch(err => {
	const errSimple = {
		name: err.name,
		parent: err.parent
	}
	console.log('>>>> Error al conectar a BBDD <<<<\n', errSimple)
})

// app de express
const app = express()

// habilitar bodyParser para leer datos de un formulario
app.use(bodyParser.urlencoded({ extended: true }))

// cargar archivos estaticos
app.use(express.static('public'))

// habilitar motor de vista pug
app.set('view engine', 'pug')

// (REVISAR ERROR CON ESTO) agregar express validator en todo
// app.use(expressValidator())

// agregar carpeta de vistas
app.set('views', path.join(__dirname, './views'))

// agregar flash messages
app.use(flash())

// cookie parser
app.use(cookieParser())

// sesiones para navegar por distintas paginas sin autenticacion
app.use(session({
	secret: 'sesionsecreta',
	resave: false,
	saveUninitialized: false
}))

// usar passport
app.use(passport.initialize())
app.use(passport.session())

// elementos disponibles en toda la aplicacion
app.use((req, res, next) => {
	// vardump (como var_dump en php)
	res.locals.vardump = helpers.vardump
	// alertas flash
	res.locals.mensajes = req.flash()
	// datos del usuario autenticado
	res.locals.usuario = { ...req.user } || null
	// seguir ejecutando los middlewares
	next()
})

// rutas
app.use('/', routes())

// servidor
app.listen(port, host, () => {
	console.log(`--> Servidor en puerto ${port} <--`)
})
