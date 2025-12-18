import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function RatingLineChart({ data }) {
  if (!data || data.length === 0) {
    return <p>No rating history available</p>;
  }

  // Format data for chart
  const chartData = data.map((item) => ({
    rating: item.rating,
    contest: item.contest,
    date: new Date(item.date).toLocaleDateString(),
  }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Rating Over Time
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rating"
            stroke="#6366f1"
            strokeWidth={3}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
