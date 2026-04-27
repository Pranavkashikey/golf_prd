"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRole] = useState(null);

  // 🔥 get role safely
  useEffect(() => {
    const r = localStorage.getItem("role");
    setRole(r);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // 🔥 important
    router.push("/login");
  };

  // 🔥 active link helper
  const linkClass = (path) =>
    `transition ${
      pathname === path
        ? "text-green-400 border-b border-green-400"
        : "hover:text-green-400"
    }`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-zinc-900/70 border-b border-white/10">
      <div className="flex items-center justify-between px-6 py-4">

        {/* 🔥 Logo */}
        <h1 className="text-xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          GolfD
        </h1>

        {/* 🔗 Links */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link href="/scores" className={linkClass("/scores")}>
            Scores
          </Link>

          <Link href="/draws" className={linkClass("/draws")}>
            Draw
          </Link>

          <Link href="/winners" className={linkClass("/winners")}>
            Winners
          </Link>

          <Link href="/subscribe" className={linkClass("/subscribe")}>
            Subscribe
          </Link>

          {/* 🔥 ADMIN LINK */}
          {role === "ADMIN" && (
            <Link
              href="/admin"
              className={`${linkClass("/admin")} text-red-400`}
            >
              Admin
            </Link>
          )}

          {/* 🔴 Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500/20 text-red-400 px-3 py-1 rounded hover:bg-red-500/30 hover:scale-105 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}