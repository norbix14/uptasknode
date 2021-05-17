import axios from 'axios'

/**
 * Modulo encargado del manejo de las acciones a realizar
 * con los proyectos
 *
 * @module funciones/projectsHandler
*/

/**
 * Funcion para eliminar un proyecto
 *
 * @param {string} origin - root path
 * @param {string} project - project to delete
 *
 * @returns {Promise}
*/
export const deleteProject = async (origin, project) => {
	try {
		const result = await axios({
			url: `${origin}/proyectos/${project}`,
			method: 'DELETE',
			params: {
				urlProyecto: project
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
