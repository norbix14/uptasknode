const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * mostrar el inicio y todos los proyectos del usuario 
 * autenticado
*/
exports.proyectosHome = async (req, res) => {
	// este codigo es para mostrar todo en el <aside>
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	// pagina a mostrar
	res.render('index', {
		nombrePagina: 'Proyectos',
		proyectos
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * mostrar el formulario para agregar un proyecto
*/
exports.formularioProyecto = async (req, res) => {
	// este codigo es para mostrar todo en el <aside>
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	// pagina a mostrar
	res.render('nuevoProyecto', {
		nombrePagina: 'Nuevo proyecto',
		proyectos
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * validar e insertar el proyecto en la base de datos
*/
exports.nuevoProyecto = async (req, res) => {
	// este codigo es para mostrar todo en el <aside>
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	// validar que tengamos algo en el input
	const { nombre } = req.body
	let errores = []
	if(!nombre) {
		errores.push({
			texto: 'Agregar nombre al proyecto'
		})
	}
	// si hay errores
	if(errores.length > 0) {
		res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo proyecto',
			errores,
			proyectos
		})
	} else {
		// no hay errores e insertar en BBDD
		const usuarioId = res.locals.usuario.id
		await Proyectos.create({ nombre, usuarioId })
		res.redirect('/')
	}
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * @param next continua el flujo de ejecucion
 * 
 * retornar las tareas del proyecto solicitado
 * mediante la url
*/
exports.proyectoPorUrl = async (req, res, next) => {
	// este codigo es para mostrar todo en el <aside>
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
	const [proyectos, proyecto] = await Promise.all([proyectosPromise,
	                                                 proyectoPromise])
	// consultar tareas del proyecto actual
	const tareas = await Tareas.findAll({
		where: {
			proyectoId: proyecto.id
		}
	})
	if(!proyecto) return next()
	// pagina a mostrar
	res.render('tareas', {
		nombrePagina: 'Tareas del proyecto',
		proyectos,
		proyecto,
		tareas
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * mostrar el formulario para editar el proyecto
 * y luego poder guardarlo
*/
exports.formularioEditar = async (req, res) => {
	// este codigo es para mostrar todo en el <aside>
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
	const [proyectos, proyecto] = await Promise.all([proyectosPromise,
	                                                 proyectoPromise])
	// pagina a mostrar
	res.render('nuevoProyecto', {
		nombrePagina: 'Editar proyecto',
		proyectos,
		proyecto
	})
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * 
 * validar y actualizar el proyecto en la base de datos
*/
exports.actualizarProyecto = async (req, res) => {
	// este codigo es para mostrar todo en el <aside>
	const usuarioId = res.locals.usuario.id
	const proyectos = await Proyectos.findAll({
		where: {
			usuarioId
		}
	})
	// validar que tengamos algo en el input
	const { nombre } = req.body
	let errores = []
	if(!nombre) {
		errores.push({
			texto: 'Agregar nombre al proyecto'
		})
	}
	// si hay errores
	if(errores.length > 0) {
		res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo proyecto',
			errores,
			proyectos
		})
	} else {
		// no hay errores y actualizar en BBDD
		await Proyectos.update(
		{
			nombre
		},
		{
			where: {
				id: req.params.id,
				usuarioId
			}
		})
		res.redirect('/')
	}
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * @param next continua el flujo de ejecucion
 * 
 * eliminar el proyecto de la base de datos
*/
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


