import express from "express";
import { createMessage } from "../controllers/messageController.js";
import { getInbox } from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMessage);
router.get("/inbox", protect, getInbox);

export default router;