import {
  createDrawService,
  calculateWinnersService,
    calculateAndStoreWinners,
} from "./draw.service.js";

export const createDraw = async (req, res) => {
  try {
    const draw = await createDrawService();

    res.status(201).json({
      success: true,
      data: draw,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getWinners = async (req, res) => {
  try {
    const { drawId } = req.params;

    const winners = await calculateWinnersService(drawId);

    res.json({
      success: true,
      data: winners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const runDrawAndWinners = async (req, res) => {
  try {
    const { drawId } = req.params;

    const winners = await calculateAndStoreWinners(drawId);

    res.json({
      success: true,
      data: winners,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};