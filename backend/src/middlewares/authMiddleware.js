import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "No tienes permisos para esta acción",
      });
    }
    next();
  };
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // verificar token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // buscar usuario real en DB
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "Usuario no existe",
        });
      }

      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }
  } else {
    return res.status(401).json({
      message: "No autorizado, sin token",
    });
  }
};
