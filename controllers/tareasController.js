const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas')

/**
 * Funcion para agregar una tarea
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {object} next - next function
*/
exports.agregarTarea = async (req, res, next) => {
	try {
		const { url } = req.params
		const proyecto = await Proyectos.findOne({
			where: {
				url
			}
		})
		const { tarea } = req.body
		const estado = 0
		const proyectoId = proyecto.id
		const resultado = await Tareas.create({
			tarea,
			estado,
			proyectoId
		})
		if (!resultado) next()
		return res.redirect(`/proyectos/${url}`)
	} catch (err) {
		return res.redirect(`/`)
	}
}

/**
 * Funcion para cambiar el estado de una tarea
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {object} next - next function
*/
exports.cambiarEstadoTarea = async (req, res, next) => {
	try {
		const { id } = req.params
		const tarea = await Tareas.findOne({
			where: {
				id
			}
		})
		let estado = 0
		if (tarea.estado === estado) {
			estado = 1
		}
		tarea.estado = estado
		const resultado = await tarea.save()
		if (!resultado) next()
		return res.status(200).send('Estado actualizado correctamente')
	} catch (err) {
		return res.status(500).send('Ha ocurrido un error')
	}
}

/**
 * Funcion para eliminar una tarea
 * 
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {object} next - next function
 */
exports.eliminarTarea = async (req, res, next) => {
	try {
		const { id } = req.params
		const resultado = await Tareas.destroy({
			where: {
				id
			}
		})
		if (!resultado) next()
		return res.status(200).send('Tarea eliminada correctamente')
	} catch (err) {
		return res.status(500).send('Ha ocurrido un error')
	}
}
