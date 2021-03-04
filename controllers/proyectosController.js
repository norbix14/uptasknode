const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

/**
 * Modulo que contiene funciones y middlewares para todo
 * lo relacionado al manejo de los proyectos
 *
 * @module controllers/proyectosController
*/

/**
 * Funcion para renderizar la pagina inicial
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.proyectosHome = async (req, res) => {
	const usuarioId = res.locals?.usuario?.id
	let proyectos = []
	try {
		proyectos = await Proyectos.findAll({
			where: {
				usuarioId
			}
		})
		return res.render('index', {
			nombrePagina: 'Proyectos',
			proyectos
		})	
	} catch (err) {
		return res.render('index', {
			nombrePagina: 'Proyectos',
			proyectos
		})
	}
	
}

/**
 * Funcion para renderizar un formulario para un nuevo proyecto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.formularioProyecto = async (req, res) => {
	const usuarioId = res.locals?.usuario?.id
	let proyectos = []
	try {
		proyectos = await Proyectos.findAll({
			where: {
				usuarioId
			}
		})
		return res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo proyecto',
			proyectos
		})	
	} catch (err) {
		return res.render('nuevoProyecto', {
			nombrePagina: 'Nuevo proyecto',
			proyectos
		})
	}
	
}

/**
 * Funcion para crear un nuevo proyecto en la base de datos
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.nuevoProyecto = async (req, res) => {
	try {
		const errores = []
		const usuarioId = res.locals?.usuario?.id
		const proyectos = await Proyectos.findAll({
			where: {
				usuarioId
			}
		})
		const { nombre } = req.body
		if (!nombre) {
			errores.push({
				texto: 'Agregar nombre al proyecto'
			})
		}
		if (errores.length > 0) {
			return res.render('nuevoProyecto', {
				nombrePagina: 'Nuevo proyecto',
				errores,
				proyectos
			})
		} else {
			await Proyectos.create({ nombre, usuarioId })
			return res.redirect('/')
		}	
	} catch (err) {
		return res.redirect('/')
	}
}

/**
 * Funcion para renderizar las tareas de un proyecto segun la url
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - next function
*/
exports.proyectoPorUrl = async (req, res, next) => {
	try {
		const usuarioId = res.locals?.usuario?.id
		const { url } = req.params
		const proyectosPromise = Proyectos.findAll({
			where: {
				usuarioId
			}
		})
		const proyectoPromise = Proyectos.findOne({
			where: {
				url,
				usuarioId
			}
		})
		const [ proyectos, proyecto ] = await Promise.all([proyectosPromise, proyectoPromise])
		const tareas = await Tareas.findAll({
			where: {
				proyectoId: proyecto.id
			}
		})
		if (!proyecto) return next()
		return res.render('tareas', {
			nombrePagina: 'Tareas del proyecto',
			proyectos,
			proyecto,
			tareas
		})	
	} catch (err) {
		return res.redirect('/')
	}
}

/**
 * Funcion para renderizar un formulario para editar un proyecto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.formularioEditar = async (req, res) => {
	try {
		const usuarioId = res.locals?.usuario?.id
		const { id } = req.params
		const proyectosPromise = Proyectos.findAll({
			where: {
				usuarioId
			}
		})
		const proyectoPromise = Proyectos.findOne({
			where: {
				id,
				usuarioId
			}
		})
		const [ proyectos, proyecto ] = await Promise.all([proyectosPromise, proyectoPromise])
		return res.render('nuevoProyecto', {
			nombrePagina: 'Editar proyecto',
			proyectos,
			proyecto
		})	
	} catch (err) {
		return res.redirect('/')
	}
}

/**
 * Funcion para actualizar un proyecto
 * @param {object} req - user request
 * @param {object} res - server response
*/
exports.actualizarProyecto = async (req, res) => {
	try {
		const errores = []
		const usuarioId = res.locals?.usuario?.id
		const { id } = req.params
		const proyectos = await Proyectos.findAll({
			where: {
				usuarioId
			}
		})
		const { nombre } = req.body
		if (!nombre) {
			errores.push({
				texto: 'Agregar nombre al proyecto'
			})
		}
		if (errores.length > 0) {
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
						id,
						usuarioId
					}
				}
			)
			return res.redirect('/')
		}	
	} catch (err) {
		return res.redirect('/')
	}
}

/**
 * Funcion para eliminar un proyecto
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - next function
*/
exports.eliminarProyecto = async (req, res, next) => {
	try {
		const usuarioId = res.locals?.usuario?.id
		const { urlProyecto } = req.query
		const proyecto = await Proyectos.findOne({
			where: {
				url: urlProyecto,
				usuarioId
			}
		})
		if(!proyecto) {
			return next()
		}
		await Tareas.destroy({
			where: {
				proyectoId: proyecto.id
			}
		})
		await Proyectos.destroy({
			where: {
				url: urlProyecto,
				usuarioId
			}
		})
		return res.status(200).send('Proyecto eliminado correctamente')	
	} catch (err) {
		return res.status(500).send('Ha ocurrido un error')
	}
}
