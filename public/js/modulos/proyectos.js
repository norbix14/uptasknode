import { SwalDelete, Toast } from '../funciones/SweetAlert'
import { deleteProject } from '../funciones/projectsHandler'

const btnDelete = document.querySelector('#eliminar-proyecto')

if(btnDelete) {
	btnDelete.addEventListener('click', (e) => {
		const { origin } = window.location
		const { target } = e
		const { dataset = {} } = target
		const { proyectoUrl = '' } = dataset
		SwalDelete(async () => {
			try {
				const {
					status,
					data
				} = await deleteProject(origin, proyectoUrl)
				if (status !== 200) {
					return Toast('warning', data)
				}
				Toast('success', data)
				setTimeout(() => window.location.href = '/', 2500)
			} catch (error) {
				return Toast('error', 'Ha ocurrido un error')
			}
		})
	})
}

export default btnDelete
