import { Toast } from './SweetAlert'

/**
 * Modulo encargado mantener actualizado el avance de
 * las tareas
 *
 * @module funciones/avance
*/

/**
 * Funcion para actualizar el avance de las tareas
*/
export const actualizarAvance = () => {
	const tareas = Array.from(document.querySelectorAll('li.tarea'))
	if(tareas && tareas.length) {
		const tareasCompletas = document.querySelectorAll('i.completo')
		const avance = Math.round((tareasCompletas.length / tareas.length) * 100)
		const porcentaje = document.querySelector('#porcentaje')
		porcentaje.style.width = avance + '%'
		if(avance === 100) {
			Toast('success', 'Tareas completadas')
		}
	}
}
