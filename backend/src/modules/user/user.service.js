import prisma from "../../config/db.js";

// 👤 get current user profile
export const getProfileService = async (userId) => {
  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      scores: true,
      winners: true,
    },
  });
};

// ✏️ update profile
export const updateProfileService = async (userId, data) => {
  return await prisma.user.update({
    where: { id: userId },
    data,
  });
};