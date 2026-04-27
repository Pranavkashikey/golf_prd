import prisma from "../../config/db.js";

// 🎯 Generate random 5 numbers (1–45)
const generateNumbers = () => {
  const set = new Set();

  while (set.size < 5) {
    set.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(set);
};

// 🎯 Create draw
export const createDrawService = async () => {
  const numbers = generateNumbers();

  const draw = await prisma.draw.create({
    data: {
      month: new Date().toLocaleString("default", { month: "long" }),
      numbers,
    },
  });

  return draw;
};

// 🧠 Match logic
const countMatches = (userScores, drawNumbers) => {
  const values = userScores.map((s) => s.value);
  return values.filter((v) => drawNumbers.includes(v)).length;
};

// 🏆 Winner calculation
export const calculateWinnersService = async (drawId) => {
  const draw = await prisma.draw.findUnique({
    where: { id: drawId },
  });

  const users = await prisma.user.findMany({
    include: { scores: true },
  });

  const winners = [];

  for (const user of users) {
    const matchCount = countMatches(user.scores, draw.numbers);

    if (matchCount >= 3) {
      winners.push({
        userId: user.id,
        matchCount,
      });
    }
  }

  return winners;
};

export const calculateAndStoreWinners = async (drawId) => {
  const draw = await prisma.draw.findUnique({
    where: { id: drawId },
  });

  if (!draw) throw new Error("Draw not found");

  const scores = await prisma.score.findMany({
    include: { user: true },
  });

  const prizePool = 10000;

  let tier = {
    5: [],
    4: [],
    3: [],
  };

  // 🎯 match logic
  for (const score of scores) {
    const matchCount = draw.numbers.includes(score.value) ? 1 : 0;

    // ⚠️ IMPORTANT: since score = single value
    if (matchCount >= 1) {
      tier[3].push(score.user); // temp push to 3-tier
    }
  }

  const winnersToStore = [];

  for (let match of [3]) {
    const usersInTier = tier[match];

    if (usersInTier.length === 0) continue;

    const totalTierPrize = prizePool * 0.25;
    const individualPrize = totalTierPrize / usersInTier.length;

    for (const user of usersInTier) {
      winnersToStore.push({
        userId: user.id,
        drawId,
        matchCount: match,
        prize: individualPrize,
      });
    }
  }

  await prisma.winner.createMany({
    data: winnersToStore,
  });

  return winnersToStore;
};