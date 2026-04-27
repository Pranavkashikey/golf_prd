import express from "express";
import prisma from "../../config/db.js";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();

// get all charities
router.get("/", async (req, res) => {
  const data = await prisma.charity.findMany();
  res.json({ success: true, data });
});

// select charity
router.post("/select", protect, async (req, res) => {
  const { charityId } = req.body;

  await prisma.user.update({
    where: { id: req.user.id },
    data: { charityId },
  });

  res.json({ success: true, message: "Charity selected" });
});

export default router;