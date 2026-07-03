import express from "express";
import { checkout, paymentWebhook } from "../controllers/payment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/checkout", authMiddleware, checkout);
router.post("/webhook", paymentWebhook);

export default router;
