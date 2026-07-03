import express from "express";
import { generatePdf } from "../controllers/pdf.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/export", authMiddleware, generatePdf);

export default router;
