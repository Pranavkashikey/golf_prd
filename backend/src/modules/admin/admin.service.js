import prisma from "../../config/db.js";

// 📊 Dashboard stats
export const getAdminStats = async () => {
  const totalUsers = await prisma.user.count();
  const totalScores = await prisma.score.count();
  const totalDraws = await prisma.draw.count();

  const totalPrize = await prisma.winner.aggregate({
    _sum: { prize: true },
  });

  return {
    totalUsers,
    totalScores,
    totalDraws,
    totalPrize: totalPrize._sum.prize || 0,
  };
};

// 👤 Get all users
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

// 🏆 Get all winners
export const getAllWinners = async () => {
  return await prisma.winner.findMany({
    include: {
      user: true,
      draw: true,
    },
  });
};

// 🎯 Get all draws
export const getAllDraws = async () => {
  return await prisma.draw.findMany({
    orderBy: { createdAt: "desc" },
  });
};