import express from "express";
import prisma from "../../config/db.js";
import {
  getStats,
  users,
  winners,
  draws,
} from "./admin.controller.js";

import {
  protect,
  isAdmin,
} from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🔐 All routes protected + admin only
router.get("/stats", protect, isAdmin, getStats);
router.get("/users", protect, isAdmin, users);
router.get("/winners", protect, isAdmin, winners);
router.get("/draws", protect, isAdmin, draws);
router.patch("/verify-winner/:id", protect, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.winner.update({
      where: { id },
      data: { status: "APPROVED" },
    });

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/reject-winner/:id", protect, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.winner.update({
      where: { id },
      data: { status: "REJECTED" },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/analytics", protect, isAdmin, async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalScores = await prisma.score.count();
    const totalDraws = await prisma.draw.count();

    const totalWinners = await prisma.winner.count();

    const pending = await prisma.winner.count({
      where: { status: "PENDING" },
    });

    const approved = await prisma.winner.count({
      where: { status: "APPROVED" },
    });

    const rejected = await prisma.winner.count({
      where: { status: "REJECTED" },
    });

    const totalPrize = await prisma.winner.aggregate({
      _sum: { prize: true },
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalScores,
        totalDraws,
        totalWinners,
        pending,
        approved,
        rejected,
        totalPrize: totalPrize._sum.prize || 0,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;