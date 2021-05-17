import axios from 'axios'

/**
 * Modulo encargado del manejo de las acciones a realizar
 * con las tareas
 *
 * @module funciones/tasksHandler
*/

/**
 * Funcion para actualizar el estado de una tarea
 *
 * @param {string} origin - root path
 * @param {string} id - task id
 *
 * @returns {Promise}
*/
export const updateStatus = async (origin, id) => {
	try {
		const result = await axios({
			url: `${origin}/tareas/${id}`,
			method: 'PATCH',
			params: {
				idTarea: id
			}
		})
		return result
	} catch (error) {
		return {
			...error,
			data: 'Ha ocurrido un error',
			message: 'Ha ocurrido un error',
			status: 500,
		}
	}
}

/**
 * Funcion para eliminar una tarea
 *
 * @param {string} origin - root path
 * @param {string} id - task id
 *
 * @returns {Promise}
*/
export const deleteTask = async (origin, id) => {
	try {
		const result = await axios({
			url: `${origin}/tareas/${id}`,
			method: 'DELETE',
			params: {
				idTarea: id
			}
		})
		return result
	} catch (error) {
		return {
			...error,
			data: 'Ha ocurrido un error',
			message: 'Ha ocurrido un error',
			status: 500,
		}
	}
}
