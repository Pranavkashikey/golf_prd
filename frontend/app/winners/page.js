"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Winners() {
  const [winners, setWinners] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const r = localStorage.getItem("role");
    setRole(r);
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const res = await api("/winners"); // ✅ public route
      setWinners(res.data || []);
    } catch (err) {
      console.error("Error fetching winners:", err);
    }
  };

  const uploadProof = async (id) => {
    const proof = prompt("Enter proof image URL");
    if (!proof) return;

    await api("/winners/upload-proof", "POST", {
      winnerId: id,
      proof,
    });

    fetchWinners();
  };

  const approveWinner = async (id) => {
    await api(`/admin/verify-winner/${id}`, "PATCH");
    fetchWinners();
  };

  const rejectWinner = async (id) => {
    await api(`/admin/reject-winner/${id}`, "PATCH");
    fetchWinners();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* 🔥 EMPTY STATE */}
        {winners.length === 0 && (
          <p className="text-gray-400 text-center col-span-full">
            No winners yet
          </p>
        )}

        {winners.map((w) => (
          <Card key={w.id}>
            <p className="text-lg font-semibold">
              {w.user?.name || "User"}
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Match: {w.matchCount}
            </p>

            <p className="text-green-400 font-semibold mt-1">
              ₹{w.prize}
            </p>

            {/* 🔥 Status */}
            <p className="mt-2 text-sm">
              Status:{" "}
              <span
                className={`px-2 py-1 text-xs rounded ${
                  w.status === "APPROVED"
                    ? "bg-green-500/20 text-green-400"
                    : w.status === "REJECTED"
                    ? "bg-red-500/20 text-red-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {w.status}
              </span>
            </p>

            {/* 📸 Proof */}
            {!w.proof && (
              <button
                onClick={() => uploadProof(w.id)}
                className="mt-3 bg-green-500 px-3 py-2 rounded w-full hover:bg-green-600 transition"
              >
                Upload Proof
              </button>
            )}

            {w.proof && (
              <img
                src={w.proof}
                alt="proof"
                className="mt-3 rounded w-full h-32 object-cover"
              />
            )}

            {/* 🔥 ADMIN ONLY BUTTONS */}
            {role === "ADMIN" && w.status === "PENDING" && (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => approveWinner(w.id)}
                  className="flex-1 bg-blue-500 px-3 py-2 rounded hover:bg-blue-600 transition"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectWinner(w.id)}
                  className="flex-1 bg-red-500 px-3 py-2 rounded hover:bg-red-600 transition"
                >
                  Reject
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}