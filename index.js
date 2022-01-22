require('dotenv').config()
const express = require('express')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const passport = require('./config/passport')
const db = require('./config/db')
const {
  createNotFoundError,
  handleNotFoundError,
} = require('./handlers/errorHandler')

const host = process.env.HOST || '0.0.0.0'
const port = Number(process.env.PORT) || 3000

require('./models/Proyectos')
require('./models/Tareas')
require('./models/Usuarios')

db.sync()
  .then(() => console.log('Conectado a la Base de Datos'))
  .catch(() => console.log('Error al conectar a la Base de Datos'))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, './views'))

app.use(flash())

app.use(cookieParser())

app.use(
  session({
    secret: process.env.SESSION,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.mensajes = req.flash()
  res.locals.usuario = { ...req.user } || null
  next()
})

app.use(routes())

app.use(createNotFoundError)
app.use(handleNotFoundError)

app.listen(port, host, () => console.log(`Servidor en puerto ${port}`))
