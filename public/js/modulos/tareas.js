import Swal from 'sweetalert2'
import axios from 'axios'
import { actualizarAvance } from '../funciones/avance'

/**
 * acciones a realizar con las tareas: 'actualizar estado' o 'borrar'
*/
const tareas = document.querySelector('.listado-pendientes')
if(tareas) {
	tareas.addEventListener('click', e => {
		// detectar cuando se hace click sobre icono 'check'
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
		// detectar cuando se hace click en el icono de 'trash'
		if (e.target.classList.contains('fa-trash')) {
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
							// eliminar el nodo HTML del DOM
							tareaHtml.parentElement.removeChild(tareaHtml)
							const Toast = Swal.mixin({
								toast: true,
								position: 'top-end',
								showConfirmButton: false,
								timer: 2000,
								timerProgressBar: true,
								onOpen: (toast) => {
									toast.addEventListener('mouseenter', Swal.stopTimer)
									toast.addEventListener('mouseleave', Swal.resumeTimer)
								}
							})
							Toast.fire({
								icon: 'success',
								title: respuesta.data
							})
							actualizarAvance()
						}
					})
					.catch(() => {
						Swal.fire('Error', 'Ha ocurrido un error', 'error')
					})
				}
			})
		}
	})
}

export default tareas
