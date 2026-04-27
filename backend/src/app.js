import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import scoreRoutes from "./modules/score/score.routes.js";
import drawRoutes from "./modules/draw/draw.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import charityRoutes from "./modules/charity/charity.routes.js";
import subscriptionRoutes from "./modules/subscription/subscription.routes.js";
import winnerRoutes from "./modules/winner/winner.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ mount routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/draws", drawRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/charities", charityRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/winners", winnerRoutes);
app.use("/api/payment", paymentRoutes);
export default app;