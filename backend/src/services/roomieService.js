import {
    createRoomie,
    findRoomieById,
    findRoomieByOwner,
    findActiveRoomies,
    updateRoomie,
    deactivateRoomie,
} from "../repositories/roomieRepository.js";

import AppError from "../errors/AppError.js";

export const createRoomieService = async (roomieData, user) => {
    const existingRoomie = await findRoomieByOwner(user._id);

    if (existingRoomie) {
        throw new AppError(
            "El usuario ya tiene un perfil de Roomie",
            400
        );
    }

    return await createRoomie({
        ...roomieData,
        owner: user._id,
    });
};

export const getMyRoomieService = async (user) => {
    const roomie = await findRoomieByOwner(user._id);

    if (!roomie) {
        throw new AppError(
            "No tienes un perfil de Roomie",
            404
        );
    }

    return roomie;
};

export const getRoomieByIdService = async (id) => {
    const roomie = await findRoomieById(id);

    if (!roomie || !roomie.active) {
        throw new AppError(
            "Perfil de Roomie no encontrado",
            404
        );
    }

    return roomie;
};

export const getActiveRoomiesService = async () => {
    return await findActiveRoomies();
};

export const updateRoomieService = async (
    id,
    updateData,
    user
) => {
    const roomie = await findRoomieById(id);

    if (!roomie) {
        throw new AppError(
            "Perfil de Roomie no encontrado",
            404
        );
    }

    const isOwner =
        roomie.owner._id.toString() ===
        user._id.toString();

    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
        throw new AppError(
            "No tienes permisos para modificar este perfil",
            403
        );
    }

    const updatedRoomie = await updateRoomie(
        id,
        updateData
    );

    return updatedRoomie;
};

export const deactivateRoomieService = async (
    id,
    user
) => {
    const roomie = await findRoomieById(id);

    if (!roomie) {
        throw new AppError(
            "Perfil de Roomie no encontrado",
            404
        );
    }

    const isOwner =
        roomie.owner._id.toString() ===
        user._id.toString();

    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
        throw new AppError(
            "No tienes permisos para desactivar este perfil",
            403
        );
    }

    return await deactivateRoomie(id);
};