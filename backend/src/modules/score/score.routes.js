import express from "express";
import { addScore, getScores } from "./score.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🔐 Protected routes
router.post("/", protect, addScore);
router.get("/", protect, getScores);

export default router;