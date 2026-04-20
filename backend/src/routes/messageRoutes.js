import express from "express";
import { createMessage } from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMessage);

export default router;