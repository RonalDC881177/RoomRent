import express from "express";
import {
    createMessage,
    getInbox,
    getConversation,
    markMessagesAsRead,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createMessage);
router.get("/inbox", protect, getInbox);
router.get(
    "/conversation/:propertyId/:otherUserId",
    protect,
    getConversation
);
router.patch(
    "/conversation/:propertyId/:otherUserId/read",
    protect,
    markMessagesAsRead
);

export default router;