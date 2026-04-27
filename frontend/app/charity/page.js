"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";

export default function Charity() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    api("/charities").then((res) => setCharities(res.data || []));
  }, []);

  const selectCharity = async (id) => {
    await api("/charities/select", "POST", { charityId: id });
    alert("Charity selected!");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {charities.map((c) => (
          <Card key={c.id}>
            <h3 className="font-semibold">{c.name}</h3>
            <p className="text-gray-400 text-sm">{c.description}</p>

            <button
              onClick={() => selectCharity(c.id)}
              className="mt-3 bg-green-500 px-4 py-2 rounded"
            >
              Select
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}