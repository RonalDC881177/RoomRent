import bcrypt from "bcryptjs";
import AppError from "../errors/AppError.js";
import { findUserForLogin } from "../repositories/userRepository.js";
import generateToken from "../utils/generateToken.js";

export const loginUserService = async ({
    identifier,
    password,
}) => {
    const user = await findUserForLogin(identifier);

    if (!user) {
        throw new AppError("Usuario no encontrado", 404);
    }

    //comparar password
    const isMatch = await bcrypt.compare(password,user.password);

    if (!isMatch) {
        throw new AppError("Contraseña incorrecta", 400);
    }

    const token = generateToken(user._id);

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            active: user.active,
        },
    };
};