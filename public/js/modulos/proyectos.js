import Swal from 'sweetalert2'
import axios from 'axios'

 /**
  * seleccionar el boton para eliminar un proyecto usando axios
 */
const btnEliminar = document.querySelector('#eliminar-proyecto')
if(btnEliminar) {
	btnEliminar.addEventListener('click', e => {
		const urlProyecto = e.target.dataset.proyectoUrl
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
			if (resultado.value) {
				const url = `${location.origin}/proyectos/${urlProyecto}`
				axios.delete(url, {
					params: {
						urlProyecto
					}
				})
				.then(respuesta => {
					const Toast = Swal.mixin({
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 2250,
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
					setTimeout(() => window.location.href = '/', 2500)
				})
				.catch(() => {
					Swal.fire('Error', 'Ha ocurrido un error', 'error')
				})
			}
		})
	})
}

export default btnEliminar
