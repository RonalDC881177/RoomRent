import User from "../models/user.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { createUserService } from "../services/userService.js";

export const createUser = asyncHandler(async (req, res) => {

  const user = await createUserService(req.body);

  res.status(201).json({
    success: true,
    message: "Usuario creado correctamente",
    data: {
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    },
  });

});
// Función para login
export const loginUser = asyncHandler(async (req, res, next) => {
    const { identifier, password } = req.body;



    if (!identifier || !password) {
      throw new AppError("Email/username y password son obligatorios", 400);
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      throw new AppError("Usuario no encontrado", 404);
    }
    
    //comparar password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError("Contraseña incorrecta", 400);
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Inicio de sesión con éxito",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
});

