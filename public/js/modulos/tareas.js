import Swal from 'sweetalert2'
import axios from 'axios'
import { actualizarAvance } from '../funciones/avance'
import { Toast } from '../funciones/toast'

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
			.then(respuesta => {
				if(respuesta.status === 200) {
					icono.classList.toggle('completo')
					actualizarAvance()
				}
			})
			.catch(err => {
				Swal('Error', 'Ha ocurrido un error', 'error')
			})
		}
		if(e.target.classList.contains('fa-trash')) {
			const tareaHtml = e.target.parentElement.parentElement
			const idTarea = tareaHtml.dataset.tarea
			Swal.fire({
				title: '¿Estás seguro de querer borrar?',
				text: "¡Esto no se puede deshacer!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Si, borrar',
				cancelButtonText: 'No, cancelar'
			})
			.then(resultado => {
				if(resultado.value) {
					const url = `${location.origin}/tareas/${idTarea}`
					axios.delete(url, {
						params: {
							idTarea
						}
					})
					.then(respuesta => {
						if(respuesta.status === 200) {
							tareaHtml.parentElement.removeChild(tareaHtml)
							Toast('success', respuesta.data)
							actualizarAvance()
						}
					})
					.catch(err => {
						Swal.fire('Error', 'Ha ocurrido un error', 'error')
					})
				}
			})
		}
	})
}

export default tareas
