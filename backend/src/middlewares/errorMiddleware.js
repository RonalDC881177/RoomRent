/***
 * Manejo de errores centralizado para la aplicacion.
 * 
 */

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        succes: false,
        status: err.status,
        message: err.message || 'Ha ocurrido un error en el servidor'
    });
};

export default errorMiddleware;
