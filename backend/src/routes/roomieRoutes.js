import express from "express";

import {
    createRoomie,
    getMyRoomie,
    getRoomieById,
    getActiveRoomies,
    updateRoomie,
    deleteRoomie,
} from "../controllers/roomieController.js";

import { protect } from "../middlewares/authMiddleware.js";

import validate from "../middlewares/validate.js";

import {
    createRoomieSchema,
    updateRoomieSchema,
} from "../validators/roomieValidator.js";

const router = express.Router();

router.get(
    "/",
    getActiveRoomies
);

router.get(
    "/my",
    protect,
    getMyRoomie
);

router.get(
    "/:id",
    getRoomieById
);

router.post(
    "/",
    protect,
    validate(createRoomieSchema),
    createRoomie
);

router.put(
    "/:id",
    protect,
    validate(updateRoomieSchema),
    updateRoomie
);

router.delete(
    "/:id",
    protect,
    deleteRoomie
);

export default router;