import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

import { addProduct, listProducts, editProduct, deleteProduct, generateDescription } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", authMiddleware, listProducts);
router.post("/add", authMiddleware, addProduct);
router.get("/list", authMiddleware, listProducts);
router.put("/:id/edit", authMiddleware, editProduct);
router.delete("/:id", authMiddleware, deleteProduct);

router.post("/generate-description", authMiddleware, generateDescription);

export default router;




