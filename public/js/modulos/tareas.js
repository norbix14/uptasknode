import axios from 'axios'
import { actualizarAvance } from '../funciones/avance'
import { SwalDelete, Toast } from '../funciones/SweetAlert'

const tareas = document.querySelector('.listado-pendientes')

if(tareas) {
	tareas.addEventListener('click', e => {
		if(e.target.classList.contains('fa-check-circle')) {
			const icono = e.target
			const idTarea = icono.parentElement.parentElement.dataset.tarea
			const url = `${location.origin}/tareas/${idTarea}`
			axios.patch(url, {
				idTarea
			})
			.then(res => {
				if(res.status === 200) {
					icono.classList.toggle('completo')
					actualizarAvance()
				}
			})
			.catch(err => {
				Toast('error', 'Ha ocurrido un error')
			})
		}
		if(e.target.classList.contains('fa-trash')) {
			const tareaHtml = e.target.parentElement.parentElement
			const idTarea = tareaHtml.dataset.tarea
			SwalDelete(() => {
				const url = `${location.origin}/tareas/${idTarea}`
				axios.delete(url, {
					params: {
						idTarea
					}
				})
				.then(res => {
					if (res.status === 200) {
						tareaHtml.parentElement.removeChild(tareaHtml)
						Toast('success', res.data)
						actualizarAvance()
					} else {
						Toast('warning', res.data)
					}
				})
				.catch(err => {
					Toast('error', 'Ha ocurrido un error')
				})
			})
		}
	})
}

export default tareas
