import express from "express";

import {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

/* ======================
   AUTH
====================== */

router.post("/register", register);

router.post("/login", login);

router.get("/me", authMiddleware, getMe);

/* ======================
   PASSWORD RESET
====================== */

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
