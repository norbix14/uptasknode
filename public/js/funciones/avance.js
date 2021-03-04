import { Toast } from './SweetAlert'

export const actualizarAvance = () => {
	const tareas = Array.from(document.querySelectorAll('li.tarea'))
	if(tareas.length) {
		const tareasCompletas = document.querySelectorAll('i.completo')
		const avance = Math.round((tareasCompletas.length / tareas.length) * 100)
		const porcentaje = document.querySelector('#porcentaje')
		porcentaje.style.width = avance + '%'
		if(avance === 100) {
			Toast('success', 'Tareas completadas')
		}
	}
}
