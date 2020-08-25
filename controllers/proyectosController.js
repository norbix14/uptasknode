const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

exports.proyectosHome = async (req, res) => {
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	res.render('index', {
		nombrePagina: 'Proyectos',
		proyectos
	})
}

exports.formularioProyecto = async (req, res) => {
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	res.render('nuevoProyecto', {
		nombrePagina: 'Nuevo proyecto',
		proyectos
	})
}

exports.nuevoProyecto = async (req, res) => {
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	const { nombre } = req.body
	let errores = []
	if(!nombre) {
		errores.push({
			texto: 'Agregar nombre al proyecto'
		})
	}
	if(errores.length > 0) {
		res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo proyecto',
			errores,
			proyectos
		})
	} else {
		const usuarioId = res.locals.usuario.id
		await Proyectos.create({ nombre, usuarioId })
		res.redirect('/')
	}
}

exports.proyectoPorUrl = async (req, res, next) => {
	const usuarioId = res.locals.usuario.id
	const proyectosPromise = Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	const proyectoPromise = Proyectos.findOne({
		where: {
			url: req.params.url,
			usuarioId
		}
	})
	const [ proyectos, proyecto ] = await Promise.all([proyectosPromise, proyectoPromise])
	const tareas = await Tareas.findAll({
		where: {
			proyectoId: proyecto.id
		}
	})
	if(!proyecto) return next()
	res.render('tareas', {
		nombrePagina: 'Tareas del proyecto',
		proyectos,
		proyecto,
		tareas
	})
}

exports.formularioEditar = async (req, res) => {
	const usuarioId = res.locals.usuario.id
	const proyectosPromise = Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	const proyectoPromise = Proyectos.findOne({
		where: {
			id: req.params.id,
			usuarioId
		}
	})
	const [ proyectos, proyecto ] = await Promise.all([proyectosPromise, proyectoPromise])
	res.render('nuevoProyecto', {
		nombrePagina: 'Editar proyecto',
		proyectos,
		proyecto
	})
}

exports.actualizarProyecto = async (req, res) => {
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	const { nombre } = req.body
	let errores = []
	if(!nombre) {
		errores.push({
			texto: 'Agregar nombre al proyecto'
		})
	}
	if(errores.length > 0) {
		res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo proyecto',
			errores,
			proyectos
		})
	} else {
		await Proyectos.update(
			{
				nombre
			},
			{
				where: {
					id: req.params.id,
					usuarioId
				}
			}
		)
		res.redirect('/')
	}
}

exports.eliminarProyecto = async (req, res, next) => {
	const usuarioId = res.locals.usuario.id
	const { urlProyecto } = req.query
	const resultado = await Proyectos.destroy({
		where: {
			url: urlProyecto,
			usuarioId
		}
	})
	if(!resultado) next()
	res.send('Proyecto eliminado correctamente')
}
