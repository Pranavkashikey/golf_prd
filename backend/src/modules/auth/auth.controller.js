import { createUser, loginUser } from "./auth.service.js";
import { generateToken } from "../../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);

    const token = generateToken(user);

    res.status(201).json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);

    const token = generateToken(user);

    res.json({
      success: true,
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};