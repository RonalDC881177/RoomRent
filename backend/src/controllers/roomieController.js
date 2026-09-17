import asyncHandler from "../utils/asyncHandler.js";

import {
    createRoomieService,
    getMyRoomieService,
    getRoomieByIdService,
    getActiveRoomiesService,
    updateRoomieService,
    deactivateRoomieService,
} from "../services/roomieService.js";

export const createRoomie = asyncHandler(
    async (req, res) => {
        const roomie = await createRoomieService(
            req.body,
            req.user
        );

        res.status(201).json({
            success: true,
            message: "Perfil de Roomie creado correctamente",
            data: {
                roomie,
            },
        });
    }
);

export const getMyRoomie = asyncHandler(
    async (req, res) => {
        const roomie =
            await getMyRoomieService(req.user);

        res.status(200).json({
            success: true,
            message: "Perfil de Roomie obtenido correctamente",
            data: {
                roomie,
            },
        });
    }
);

export const getRoomieById = asyncHandler(
    async (req, res) => {
        const roomie =
            await getRoomieByIdService(
                req.params.id
            );

        res.status(200).json({
            success: true,
            message: "Perfil de Roomie obtenido correctamente",
            data: {
                roomie,
            },
        });
    }
);

export const getActiveRoomies = asyncHandler(
    async (req, res) => {
        const roomies =
            await getActiveRoomiesService();

        res.status(200).json({
            success: true,
            results: roomies.length,
            message: "Perfiles de Roomie obtenidos correctamente",
            data: {
                roomies,
            },
        });
    }
);

export const updateRoomie = asyncHandler(
    async (req, res) => {
        const roomie =
            await updateRoomieService(
                req.params.id,
                req.body,
                req.user
            );

        res.status(200).json({
            success: true,
            message: "Perfil de Roomie actualizado correctamente",
            data: {
                roomie,
            },
        });
    }
);

export const deleteRoomie = asyncHandler(
    async (req, res) => {
        const roomie =
            await deactivateRoomieService(
                req.params.id,
                req.user
            );

        res.status(200).json({
            success: true,
            message: "Perfil de Roomie desactivado correctamente",
            data: {
                roomie,
            },
        });
    }
);