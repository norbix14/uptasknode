import Swal from 'sweetalert2'

/**
 * Modulo encargado del manejo de las alertas
 *
 * @module funciones/SweetAlert
*/

/**
 * Funcion que pregunta por la eliminacion
 * 
 * @param {function} callback - executes callback when the
 * modal is confirmed
*/
export const SwalDelete = (callback) => {
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
  .then((result) => {
    if(result.isConfirmed) {
      return callback()
    }
  })
}

/**
 * Funcion que muestra una ventana modal informativa
 * 
 * @param {string} icon - a string with the icon class
 * @param {string} message - the message to show
*/
export const Toast = (icon = 'success', message = 'Correcto') => {
  const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  return toast.fire({ icon, title: message })
}
