/***
 * Errores personalizados para la aplicacion
 * class AppError extends Error: crea una clase personalizada basada en el sistema de errores
 * super(message): Llama al contructor de error.
 * this.statusCode = statusCode: Guarda el codigo HTTP del error.
 * this.status = `${statusCode}`.startsWith('4'): determina si el error es del cliente codigos 4xx o si es del servidor codigos 5xx.
 * this.isOperational = true: Marca el errores controlados.
 * Error.captureStackTrace(this, this.constructor): Captura la pila de llamadas para ayudar en la depuración.
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;