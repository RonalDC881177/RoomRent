import asyncHandler from "../utils/asyncHandler.js";
import { createUserService } from "../services/userService.js";
import { loginUserService } from "../services/authService.js"


// Funcion para crear usuario.
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
// Función para login.
export const loginUser = asyncHandler(async (req, res) => {

  const result = await loginUserService(req.body);

  res.status(200).json({
    success: true,
    message: "Inicio de sesión con éxito",
    data: result,
  });
});