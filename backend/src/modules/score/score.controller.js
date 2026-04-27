import {
  addScoreService,
  getScoresService,
} from "./score.service.js";

export const addScore = async (req, res) => {
  try {
    const userId = req.user.id;

    const score = await addScoreService(userId, req.body);

    res.status(201).json({
      success: true,
      data: score,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await getScoresService(userId);

    res.json({
      success: true,
      data: scores,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};