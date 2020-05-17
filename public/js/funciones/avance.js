import Swal from 'sweetalert2'

/**
 * actualizar el avance del proyecto
*/
export const actualizarAvance = () => {
	// seleccionar tareas existentes
	const tareas = document.querySelectorAll('li.tarea')
	if(tareas.length) {
		// seleccionar tareas completadas
		const tareasCompletas = document.querySelectorAll('i.completo')
		// calcular el avance
		const avance = Math.round((tareasCompletas.length / tareas.length) * 100)
		// mostrar el avance
		const porcentaje = document.querySelector('#porcentaje')
		porcentaje.style.width = avance + '%'
		// mostrar notificacion de tareas completadas
		if(avance === 100) {
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
				title: 'Tareas completadas'
			})
		}
	}
}
