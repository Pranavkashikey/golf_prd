import express from "express";
import prisma from "../../config/db.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// 🔥 GET winners (ALL USERS)
router.get("/", protect, async (req, res) => {
  try {
    const winners = await prisma.winner.findMany({
      include: {
        user: true,
        draw: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.json({
      success: true,
      data: winners,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// 📸 Upload proof
router.post("/upload-proof", protect, async (req, res) => {
  try {
    const { winnerId, proof } = req.body;

    const updated = await prisma.winner.update({
      where: { id: winnerId },
      data: {
        proof,
        status: "PENDING",
      },
    });

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; // ✅ ONLY ONCE