import axios from 'axios'
import { SwalDelete, Toast } from '../funciones/SweetAlert'

const btnDeleteProject = document.querySelector('#eliminar-proyecto')

if(btnDeleteProject) {
	btnDeleteProject.addEventListener('click', e => {
		const urlProyecto = e.target.dataset.proyectoUrl
		SwalDelete(() => {
			const url = `${location.origin}/proyectos/${urlProyecto}`
			axios.delete(url, {
				params: {
					urlProyecto
				}
			})
			.then(res => {
				if (res.status === 200) {
					Toast('success', res.data)
					setTimeout(() => window.location.href = '/', 2500)
				} else {
					Toast('warning', res.data)
				}
			})
			.catch(err => {
				Toast('error', 'Ha ocurrido un error')
			})
		})
	})
}

export default btnDeleteProject
