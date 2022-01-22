const createError = require('http-errors')

/**
 * Modulo para creacion y manejo de errores HTTP
 *
 * @module handlers/errorHandler
 */

/**
 * Funcion para crear error 404
 *
 * @param {object} req - user request
 * @param {object} res - server response
 * @param {function} next - continue to the next middleware
 */
exports.createNotFoundError = (req, res, next) => {
  next(createError(404))
}

/**
 * Funcion para manejar el error 404
 *
 * @param {object} err - error object
 * @param {object} req - user request
 * @param {object} res - server response
 */
exports.handleNotFoundError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  // set locals, only providing error in development
  res.locals.environment = req.app.get('env')
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  // render the error page
  res.status(err.status || 404)
  res.render('error', {
    title: '404',
    nombrePagina: '404 - Not found',
  })
}
