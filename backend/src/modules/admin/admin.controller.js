import {
  getAdminStats,
  getAllUsers,
  getAllWinners,
  getAllDraws,
} from "./admin.service.js";

export const getStats = async (req, res) => {
  try {
    const data = await getAdminStats();

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const users = async (req, res) => {
  const data = await getAllUsers();
  res.json({ success: true, data });
};

export const winners = async (req, res) => {
  const data = await getAllWinners();
  res.json({ success: true, data });
};

export const draws = async (req, res) => {
  const data = await getAllDraws();
  res.json({ success: true, data });
};