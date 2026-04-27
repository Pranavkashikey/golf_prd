import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    ENV.JWT_SECRET,
    { expiresIn: "7d" }
  );
};