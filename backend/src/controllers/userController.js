import User from "../models/user.js";
import AppError from "../utils/appError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Crear usuario
export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    return next(new AppError("Todos los campos son obligatorios", 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new AppError("El usuario ya existe", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    username,
  });

  res.status(201).json({
    message: "Usuario creado correctamente",
    user: {
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
    },
  });
});

// Función para login
export const loginUser = async (req, res) => {
  try {

    const { identifier, password } = req.body;
    
    

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Email/username y password son obligatorios" });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    //comparar password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
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
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
