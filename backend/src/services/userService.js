import AppError from "../errors/AppError.js";

import {
    findUserByEmail,
    createUserRepository,
} from "../repositories/userRepository.js";

export const createUserService = async (userData) => {
    const { name, email, password, username } = userData;

    if (!name || !email || !password || !username) {
        throw new AppError("Todos los campos son obligatorios", 400);
    }

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new AppError("El usuario ya existe", 400);
    }

    const user = await createUserRepository({
        name,
        email,
        password,
        username,
    });

    return user;
};