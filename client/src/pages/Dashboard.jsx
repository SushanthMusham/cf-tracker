import { useEffect, useState } from "react";
import api from "../services/api";
import StatCard from "../components/StatsCard";
import { useNavigate } from "react-router-dom";

import RatingLineChart from "../components/charts/RatingLineChart";
import RatingBarChart from "../components/charts/RatingBarChart";
import TagPieChart from "../components/charts/TagPieChart";





export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return true;
  });

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Auth check + fetch stats
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }


    const fetchStats = async () => {
      try {
        const res = await api.get("/cf/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
  if (stats) {
    console.log("CF STATS FROM BACKEND 👉", stats);
  }
}, [stats]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      <main className="p-6 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome to your dashboard!
        </h2>

        {stats ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Codeforces Handle" value={stats.cfHandle} />

            <StatCard title="Current Rating" value={stats.currentRating} />

            <StatCard title="Max Rating" value={stats.maxRating} />

            <StatCard title="Problems Solved" value={stats.totalSolved} />
          </div>
        ) : (
          <p>Loading stats...</p>
        )}

        {stats && (
          <div className="mt-12 space-y-12">
            {/* Rating over time */}
            <RatingLineChart data={stats.ratingHistory} />

            {/* Rating-wise solved problems */}
            <RatingBarChart data={stats.ratingWiseSolved} />

            {/* Tag-wise solved problems */}
            <TagPieChart data={stats.tagWiseSolved} />
          </div>
        )}
      </main>
      <button
        onClick={async () => {
          await api.get("/cf/stats?refresh=true");
          window.location.reload();
        }}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Refresh Stats
      </button>
    </div>
  );
}
