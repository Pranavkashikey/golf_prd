import prisma from "../../config/db.js";

export const addScoreService = async (userId, { value, date }) => {
  // 1️⃣ Validation
  if (value < 1 || value > 45) {
    throw new Error("Score must be between 1 and 45");
  }

  // 2️⃣ Existing scores fetch (oldest first)
  const scores = await prisma.score.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  // 3️⃣ Duplicate date check
  const exists = scores.find(
    (s) =>
      new Date(s.date).toDateString() === new Date(date).toDateString()
  );

  if (exists) {
    throw new Error("Score already exists for this date");
  }

  // 4️⃣ Max 5 logic
  if (scores.length >= 5) {
    await prisma.score.delete({
      where: { id: scores[0].id }, // oldest delete
    });
  }

  // 5️⃣ Create new score
  const newScore = await prisma.score.create({
  data: {
    value,
    date: new Date(date), // 🔥 FIX
    userId,
  },
});

  return newScore;
};

export const getScoresService = async (userId) => {
  return await prisma.score.findMany({
    where: { userId },
    orderBy: { date: "desc" }, // latest first
  });
};