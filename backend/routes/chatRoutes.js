import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { sendMessage } from "../controllers/chatController.js";

const router = Router();

router.post("/send", authMiddleware, sendMessage);

export default router;
