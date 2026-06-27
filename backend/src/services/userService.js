import AppError from "../errors/AppError.js";

import {
    findUserByEmail,
    createUserRepository,
} from "../repositories/userRepository.js";

export const createUserService = async (userData) => {
    const { name, email, password, username, role } = userData;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new AppError("El usuario ya existe", 400);
    }

    const user = await createUserRepository(userData);
        
    return user;
};