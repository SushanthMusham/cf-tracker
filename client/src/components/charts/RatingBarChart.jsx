import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RatingBarChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p>No rating-wise data</p>;
  }

  const chartData = Object.entries(data).map(([rating, count]) => ({
    rating,
    solved: count,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Problems Solved by Rating
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="rating" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="solved" fill="#22c55e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
