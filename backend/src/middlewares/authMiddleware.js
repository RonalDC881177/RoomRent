import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppError from "../errors/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";


export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new AppError("No autorizado, sin token",401);
  }

  token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new AppError("Usuario no existe",401);
  }

  if (!user.active) {
    throw new AppError("Usuario deshabilitado",403);
  }

  req.user = user;

  next();
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("No tienes permisos para esta acción",403)
      );
    }

    next();
  };
};