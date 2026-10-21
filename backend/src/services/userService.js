import AppError from "../errors/AppError.js";
import {
    findUserByEmail,
    createUserRepository,
    findPublicUserById,
} from "../repositories/userRepository.js";
import mongoose from "mongoose";

export const createUserService = async (userData) => {
    const { name, email, password, username, role } = userData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new AppError("El usuario ya existe", 400);
    }

    const user = await createUserRepository(userData);

    return user;
};

export const getPublicUserProfileService = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new AppError("El identificador del usuario no es válido", 400);
    }

    const user = await findPublicUserById(userId);

    if (!user || !user.active) {
        throw new AppError("Usuario no encontrado", 404);
    }

    return {
        id: user._id,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
    };
};