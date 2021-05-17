import { actualizarAvance } from '../funciones/avance'
import { SwalDelete, Toast } from '../funciones/SweetAlert'
import { updateStatus, deleteTask } from '../funciones/tasksHandler'

const tareas = document.querySelector('.listado-pendientes')

if(tareas) {
	tareas.addEventListener('click', async (e) => {
		const { origin } = window.location
		const { target } = e
		const { classList, parentElement } = target
		const { dataset = {} } = parentElement
		const { idTarea = '' } = dataset
		if(classList.contains('fa-check-circle')) {
			try {
				const {
					status,
					data
				} = await updateStatus(origin, idTarea)
				if(status !== 200) {
					return Toast('warning', data)
				}
				classList.toggle('completo')
				actualizarAvance()
			} catch (error) {
				return Toast('error', 'Ha ocurrido un error')
			}
		}
		if(classList.contains('fa-trash')) {
			SwalDelete(async () => {
				try {
					const tareaHtml = parentElement.parentElement
					const {
						status,
						data
					} = await deleteTask(origin, idTarea)
					if (status !== 200) {
						return Toast('warning', data)
					}
					tareaHtml.parentElement.removeChild(tareaHtml)
					Toast('success', data)
					actualizarAvance()
				} catch (error) {
					return Toast('error', 'Ha ocurrido un error')
				}
			})
		}
	})
}

export default tareas
