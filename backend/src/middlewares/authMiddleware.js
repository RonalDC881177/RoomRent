const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  // verificar si hay header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // obtener token
      token = req.headers.authorization.split(' ')[1];

      // verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // guardar usuario en request
      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Token inválido',
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: 'No autorizado, sin token',
    });
  }
};

module.exports = protect;