import express from "express";
import {
  createDraw,
  getWinners,
  runDrawAndWinners
} from "./draw.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// admin-like protected
router.post("/", protect, createDraw);

// get winners
router.get("/:drawId/winners", protect, getWinners);
router.post("/:drawId/run", protect, runDrawAndWinners);
export default router;