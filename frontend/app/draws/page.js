"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Draws() {
  const [draw, setDraw] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🎯 Generate Draw
  const createDraw = async () => {
    setLoading(true);

    const res = await api("/draws", "POST");
    setDraw(res.data);

    setLoading(false);
  };

  // 🧠 Run Draw (calculate winners)
  const runDraw = async () => {
    if (!draw?.id) {
      alert("Generate draw first");
      return;
    }

    setLoading(true);

    await api(`/draws/${draw.id}/run`, "POST");

    setLoading(false);

    alert("✅ Winners calculated!");

    // 🔥 auto redirect to winners page
    window.location.href = "/winners";
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 space-y-8">

        {/* 🔥 Generate Draw */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            Generate Monthly Draw
          </h2>

          <button
            onClick={createDraw}
            className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 transition"
          >
            {loading ? "Generating..." : "Generate Draw"}
          </button>
        </Card>

        {/* 🔥 Draw Result + Run Button */}
        {draw && (
          <Card>
            <h3 className="mb-3 text-lg font-semibold">
              Draw Numbers
            </h3>

            <div className="flex gap-3 flex-wrap mb-4">
              {draw.numbers.map((num, i) => (
                <div
                  key={i}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-black font-bold text-lg shadow"
                >
                  {num}
                </div>
              ))}
            </div>

            {/* 🔥 Run Draw Button */}
            <button
              onClick={runDraw}
              className="bg-blue-500 px-6 py-3 rounded hover:bg-blue-600 transition"
            >
              {loading ? "Processing..." : "Run Draw"}
            </button>
          </Card>
        )}
      </div>
    </div>
  );
}