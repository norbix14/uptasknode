const { Router } = require('express')
const usuariosController = require('../controllers/usuariosController')

const router = Router()

/**
 * Modulo encargado del enrutamiento al crear cuenta
 *
 * @module routes/signup
 */

/**
 * Maneja el enrutamiento al crear cuenta
 */
module.exports = function () {
  /*
   * /crear-cuenta
   */
  // muestra un formulario
  router.get('/', usuariosController.formCrearCuenta)
  // crear la cuenta
  router.post('/', usuariosController.crearCuenta)
  return router
}
