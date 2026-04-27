import express from "express";
import Stripe from "stripe";
import { protect } from "../../middlewares/auth.middleware.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 💳 create checkout session
router.post("/create-checkout", protect, async (req, res) => {
  const { plan } = req.body;

  const price =
    plan === "MONTHLY" ? 500 : 5000; // ₹ example

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",

    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${plan} Subscription`,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      },
    ],

    success_url: `${process.env.CLIENT_URL}/dashboard?plan=${plan}`,
    cancel_url: `${process.env.CLIENT_URL}/subscribe`,
  });

  res.json({ url: session.url });
});

export default router;