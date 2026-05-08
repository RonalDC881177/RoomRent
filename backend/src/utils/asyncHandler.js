/***
 * Wrapper automático para async/await.
 * Permite manejar errores de forma centralizada sin tener que usar try/catch en cada funcion.
 * 
 * asyncHandler(): captura automaticamente los errores async y los manda a next(error).
 * return (req, res, next): devuelve un middleware valido.
 * Promise.resolve(fn(req, res, next)): Convierte el resultado en una Promise segura.
 * .catch(next): Si la promesa se rechaza, el error se pasa al siguiente middleware de manejo de errores.
 */

const asyncHandler = (fn) =>{
    return (req, res, next) =>{
        Promise.resolve(fn(req, res, next)).catch(next)
    };
};

export default asyncHandler;