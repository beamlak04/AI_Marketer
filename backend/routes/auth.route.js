import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { login, signup, me, updateProfile } from "../controllers/auth.controller.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/get", authMiddleware, me);
router.get("/me", authMiddleware, me);
router.put("/profile", authMiddleware, updateProfile);

export default router;