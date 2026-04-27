"use client";

import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useState } from "react";

export default function Subscribe() {
  const [loading, setLoading] = useState(false);

  const subscribe = async (plan) => {
    try {
      setLoading(true);

      const res = await api("/payment/create-checkout", "POST", {
        plan,
      });

      // 🔥 redirect to Stripe
      window.location.href = res.url;
    } catch (err) {
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center p-10 gap-8">

        <h1 className="text-3xl font-bold">
          Choose Your Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">

          {/* 🔥 Monthly Plan */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">
              Monthly Plan
            </h2>

            <p className="text-gray-400 mb-4">
              ₹500 / month
            </p>

            <button
              onClick={() => subscribe("MONTHLY")}
              className="bg-green-500 w-full py-2 rounded hover:bg-green-600 transition"
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </Card>

          {/* 🔥 Yearly Plan */}
          <Card>
            <h2 className="text-xl font-semibold mb-2">
              Yearly Plan
            </h2>

            <p className="text-gray-400 mb-4">
              ₹5000 / year
            </p>

            <button
              onClick={() => subscribe("YEARLY")}
              className="bg-green-500 w-full py-2 rounded hover:bg-green-600 transition"
            >
              {loading ? "Processing..." : "Subscribe"}
            </button>
          </Card>

        </div>
      </div>
    </div>
  );
}