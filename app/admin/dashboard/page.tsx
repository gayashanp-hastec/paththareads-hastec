"use client";

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);

  // Fetch pending advertisements count
  useEffect(() => {
    const fetchPendingCount = async () => {
      const res = await fetch("/api/ads");
      const data = await res.json();
      const pending = data.filter(
        (ad: any) => ad.status.toLowerCase() === "pending"
      ).length;
      setPendingCount(pending);
    };
    fetchPendingCount();
  }, []);

  const tiles = [
    { name: "Advertisements", hasBadge: true },
    { name: "Users", hasBadge: false },
    { name: "Reports", hasBadge: false },
    { name: "Settings", hasBadge: false },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto space-y-6">
        <h4 className="text-right font-semibold text-gray-600">
          Paththare Ads Admin
        </h4>

        <h2 className="text-2xl font-bold">Quick Links</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
          {tiles.map((tile) => (
            <div
              key={tile.name}
              className="relative bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition cursor-pointer"
            >
              <span className="text-lg font-semibold text-gray-800">
                {tile.name}
              </span>

              {/* Pending badge for Advertisements */}
              {tile.hasBadge && pendingCount > 0 && (
                <span className="absolute top-3 right-3 inline-flex items-center justify-center px-2.5 py-1.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full shadow-lg animate-pulse">
                  {pendingCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-8">Insights</h2>
        <div className="bg-white rounded-2xl shadow p-6 h-64 flex items-center justify-center text-gray-400">
          [Graphs coming soon]
        </div>
      </main>
    </div>
  );
}
