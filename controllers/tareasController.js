const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * @param next continua el flujo de ejecucion
 * 
 * agregar la tarea en la base de datos
*/
exports.agregarTarea = async (req, res, next) => {
	// obtener proyecto actual
	const proyecto = await Proyectos.findOne({
		where: {
			url: req.params.url
		}
	})
	// leer valor del input
	const { tarea } = req.body
	// estado incompleto por defecto
	const estado = 0
	// id del proyecto al que pertenece
	const proyectoId = proyecto.id
	// insertar en bbdd
	const resultado = await Tareas.create({
		tarea,
		estado,
		proyectoId
	})
	if(!resultado) next()
	// redireccionar
	res.redirect(`/proyectos/${req.params.url}`)
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * @param next continua el flujo de ejecucion
 * 
 * actualizar el estado de la tarea en la 
 * base de datos
*/
exports.cambiarEstadoTarea = async (req, res, next) => {
	const { id } = req.params
	const tarea = await Tareas.findOne({
		where: {
			id
		}
	})
	// cambiar estado
	let estado = 0
	if(tarea.estado === estado) {
		estado = 1
	}
	tarea.estado = estado
	const resultado = await tarea.save()
	if(!resultado) next()
	res.status(200).send('Estado actualizado correctamente')
}


/**
 * @param req es la peticion que hace el usuario
 * @param res es la respuesta que da el servidor
 * @param next continua el flujo de ejecucion
 * 
 * eliminar la tarea de la base de datos
*/
exports.eliminarTarea = async (req, res, next) => {
	const { id } = req.params
	const resultado = await Tareas.destroy({
		where: {
			id
		}
	})
	if(!resultado) next()
	res.status(200).send('Tarea eliminada correctamente')
}


