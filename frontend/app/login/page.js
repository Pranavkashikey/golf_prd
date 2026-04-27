"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api("/auth/login", "POST", {
        email,
        password,
      });

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        router.push("/dashboard");
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black relative overflow-hidden">

      {/* 🔥 Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/20 blur-[150px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 Card */}
      <div className="relative bg-zinc-900/80 backdrop-blur-xl border border-red-500/20 p-8 rounded-2xl w-full max-w-md shadow-[0_0_40px_rgba(255,0,0,0.2)]">

        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide 
          bg-gradient-to-r from-red-400 via-red-600 to-green-400 
          bg-clip-text text-transparent animate-pulse">
          Enter the System
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-500 mb-4 text-sm text-center animate-pulse">
            {error}
          </p>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="p-3 bg-black/60 border border-zinc-700 rounded outline-none 
            focus:border-red-500 focus:shadow-[0_0_10px_rgba(255,0,0,0.4)] transition"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 bg-black/60 border border-zinc-700 rounded outline-none 
            focus:border-green-500 focus:shadow-[0_0_10px_rgba(0,255,0,0.3)] transition"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-green-500 p-3 rounded font-semibold 
            hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,0,0.4)] transition-all duration-300"
          >
            {loading ? "Accessing..." : "Login"}
          </button>
        </div>

        {/* Register */}
        <p className="text-sm text-gray-400 mt-5 text-center">
          Don’t have an account?{" "}
          <span
            className="text-green-400 cursor-pointer hover:underline hover:text-green-300 transition"
            onClick={() => router.push("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}