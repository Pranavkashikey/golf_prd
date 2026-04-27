"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Scores() {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);

  const fetchScores = async () => {
    const res = await api("/scores");
    setScores(res.data || []);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async () => {
     if (value < 1 || value > 45) {
    alert("Score must be between 1 and 45");
    return;
  }
    await api("/scores", "POST", {
      value: Number(value),
      date,
    });

    setValue("");
    setDate("");
    fetchScores();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 space-y-8">

        {/* 🔥 Add Score Card */}
        <Card>
          <h2 className="text-xl font-semibold mb-4">
            Add New Score
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              value={value}
              placeholder="Score"
              className="p-3 bg-zinc-800 rounded outline-none w-full"
              onChange={(e) => setValue(e.target.value)}
            />

            <input
              type="date"
              value={date}
              className="p-3 bg-zinc-800 rounded outline-none w-full"
              onChange={(e) => setDate(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="bg-green-500 px-6 py-3 rounded hover:bg-green-600 transition"
            >
              Add
            </button>
          </div>
        </Card>

        {/* 🔥 Score List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Your Scores
          </h2>

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