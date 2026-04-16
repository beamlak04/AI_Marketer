import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { sendMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/message", authMiddleware, sendMessage);

export default router;
