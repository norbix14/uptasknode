import Swal from 'sweetalert2'

export const Toast = (icon = 'success', title = 'Acción realizada') => {
	const ToastFire = Swal.mixin({
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
	return ToastFire.fire({ icon, title })
}
