"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const [scores, setScores] = useState([]);
  const [stats, setStats] = useState({
    totalScores: 0,
    bestScore: 0,
  });
  const [subscription, setSubscription] = useState(null);
  const [role, setRole] = useState(null); // 🔥 FIX

  // 🔥 GET ROLE PROPERLY
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // 🔥 FETCH DATA
  const fetchData = async () => {
    const scoreRes = await api("/scores");
    const scoreData = scoreRes.data || [];
    setScores(scoreData);

    const best = scoreData.length
      ? Math.max(...scoreData.map((s) => s.value))
      : 0;

    setStats({
      totalScores: scoreData.length,
      bestScore: best,
    });

    const subRes = await api("/subscription/status");
    setSubscription(subRes.data);
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchData();
  }, []);

  // 🔥 DEMO FIX (SUBSCRIPTION)
  useEffect(() => {
    const activateSubscription = async () => {
      const plan = searchParams.get("plan");
      if (!plan) return;

      await api("/subscription/subscribe", "POST", { plan });

      await fetchData();

      window.history.replaceState({}, "", "/dashboard");
    };

    activateSubscription();
  }, [searchParams]);

  // 💳 SUBSCRIBE
  const handleSubscribe = async (plan) => {
    const res = await api("/payment/create-checkout", "POST", {
      plan,
    });

    window.location.href = res.url;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 space-y-8">

        {/* 🔥 Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <p className="text-gray-400 text-sm">Total Scores</p>
            <h2 className="text-2xl font-bold">{stats.totalScores}</h2>
          </Card>

          <Card>
            <p className="text-gray-400 text-sm">Best Score</p>
            <h2 className="text-2xl font-bold">{stats.bestScore}</h2>
          </Card>

          <Card>
            <p className="text-gray-400 text-sm">Status</p>
            <h2 className="text-green-400 font-semibold">Active</h2>
          </Card>

          {/* 🔥 Subscription */}
          <Card>
            <p className="text-gray-400 text-sm">Subscription</p>

            <h2 className="text-lg font-semibold mb-3">
              {subscription?.status === "ACTIVE" ? "Active" : "Inactive"}
            </h2>

            {subscription?.status !== "ACTIVE" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleSubscribe("MONTHLY")}
                  className="bg-green-500 px-3 py-2 rounded text-sm"
                >
                  Monthly
                </button>

                <button
                  onClick={() => handleSubscribe("YEARLY")}
                  className="bg-green-500 px-3 py-2 rounded text-sm"
                >
                  Yearly
                </button>
              </div>
            )}
          </Card>
        </div>

        {/* 🔥 ADMIN PANEL */}
        {role === "ADMIN" && (
          <Card>
            <p className="text-red-400 font-semibold">
              Admin Access Enabled 🔥
            </p>

            <p className="text-gray-400 text-sm mt-1">
              You can manage winners and verify proofs
            </p>
          </Card>
        )}

        {/* 🔥 Scores */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Scores</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {scores.map((s) => (
              <Card key={s.id}>
                <p className="text-lg font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  Score: {s.value}
                </p>

                <p className="text-gray-400 text-sm">
                  {new Date(s.date).toDateString()}
                </p>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}