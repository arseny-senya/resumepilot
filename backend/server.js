import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import pdfRoutes from "./routes/pdf.routes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
/* ======================
   DEBUG ENV
====================== */

console.log("STRIPE KEY:", process.env.STRIPE_SECRET_KEY ? "OK" : "MISSING");

const app = express();

/* ======================
   MIDDLEWARE
====================== */

app.use(
  cors({
    origin: [
      "https://resumepilotonline.com",
      "https://www.resumepilotonline.com",
    ],
    credentials: true,
  }),
);

/* Stripe webhook ДОЛЖЕН идти ДО express.json() */
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

/* ======================
   DATABASE
====================== */

connectDB();

/* ======================
   ROUTES
====================== */

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/resumes", resumeRoutes);

/* ======================
   TEST ROUTE
====================== */

app.get("/", (req, res) => {
  res.send("Resume Builder API is running 🚀");
});

/* ======================
   START SERVER
====================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
