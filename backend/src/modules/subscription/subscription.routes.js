import express from "express";
import prisma from "../../config/db.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// subscribe
router.post("/subscribe", protect, async (req, res) => {
  const { plan } = req.body;

  const start = new Date();
  const end = new Date();

  if (plan === "MONTHLY") end.setMonth(end.getMonth() + 1);
  else end.setFullYear(end.getFullYear() + 1);

  const sub = await prisma.subscription.upsert({
    where: { userId: req.user.id },
    update: { plan, status: "ACTIVE", startDate: start, endDate: end },
    create: {
      userId: req.user.id,
      plan,
      status: "ACTIVE",
      startDate: start,
      endDate: end,
    },
  });

  res.json({ success: true, data: sub });
});

// status
router.get("/status", protect, async (req, res) => {
  const sub = await prisma.subscription.findUnique({
    where: { userId: req.user.id },
  });

  res.json({ success: true, data: sub });
});

export default router;