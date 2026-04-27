"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function AdminDashboard() {
  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {
    const res = await api("/admin/analytics");
    setData(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 space-y-8">

        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* 🔥 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <Card>
            <p className="text-gray-400">Users</p>
            <h2 className="text-2xl font-bold">{data.totalUsers}</h2>
          </Card>

          <Card>
            <p className="text-gray-400">Scores</p>
            <h2 className="text-2xl font-bold">{data.totalScores}</h2>
          </Card>

          <Card>
            <p className="text-gray-400">Draws</p>
            <h2 className="text-2xl font-bold">{data.totalDraws}</h2>
          </Card>

          <Card>
            <p className="text-gray-400">Total Prize</p>
            <h2 className="text-green-400 text-xl">₹{data.totalPrize}</h2>
          </Card>
        </div>

        {/* 🔥 Winners Status */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <Card>
            <p className="text-yellow-400">Pending</p>
            <h2 className="text-2xl">{data.pending}</h2>
          </Card>

          <Card>
            <p className="text-green-400">Approved</p>
            <h2 className="text-2xl">{data.approved}</h2>
          </Card>

          <Card>
            <p className="text-red-400">Rejected</p>
            <h2 className="text-2xl">{data.rejected}</h2>
          </Card>
        </div>

      </div>
    </div>
  );
}