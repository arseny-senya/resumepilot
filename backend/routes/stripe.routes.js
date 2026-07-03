import express from "express";
import { checkout, stripeWebhook } from "../controllers/stripe.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ======================
   CHECKOUT
====================== */
router.post("/checkout", authMiddleware, checkout);

/* ======================
   WEBHOOK (Stripe only)
====================== */
router.post("/webhook", stripeWebhook);
export default router;
