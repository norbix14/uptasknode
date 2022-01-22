const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

/**
 * Modulo encargado del enrutamiento al cerrar sesion
 *
 * @module routes/logout
 */

/**
 * Maneja el enrutamiento al cerrar sesion
 */
module.exports = function () {
  /*
   * /cerrar-sesion
   */
  // cerrar sesion
  router.get('/', authController.cerrarSesion)
  return router
}
