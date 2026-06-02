import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState, useEffect } from "react";

export default function UserGrowthChart() {
  const chartData = [
    { month: "Jan", users: 13 },
    { month: "Feb", users: 17 },
    { month: "Mar", users: 12 },
    { month: "Apr", users: 16 },
    { month: "May", users: 23 },
    { month: "Jun", users: 31 },
    { month: "Jul", users: 28 },
    { month: "Aug", users: 18 },
    { month: "Sep", users: 13 },
    { month: "Oct", users: 9 },
    { month: "Nov", users: 15 },
    { month: "Dec", users: 19 },
  ];
  const [isLightMode, setIsLightMode] = useState(
    document.documentElement.classList.contains("light"),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const chartGrid = isLightMode ? "#cbd5e1" : "#1f2937";
  const chartText = "#64748b";
  const tooltipBorder = isLightMode
    ? "1px solid rgba(0,0,0,0.1)"
    : "1px solid hsla(225, 0%, 100%, 0.15)";
  const maxValue =
    Math.ceil(Math.max(...chartData.map((data) => data.users)) / 10) * 10;

  return (
    <ResponsiveContainer width="100%" height="90%">
      <BarChart data={chartData}>
        <CartesianGrid
          stroke={chartGrid}
          strokeDasharray="10"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          stroke={chartText}
          style={{ fontSize: "14px" }}
        />
        <YAxis
          domain={[0, maxValue]}
          ticks={Array.from({ length: maxValue / 10 + 1 }, (_, i) => i * 10)}
          allowDecimals={false}
          stroke={chartText}
          style={{ fontSize: "14px" }}
        />

        <Tooltip
          cursor={{
            fill: "rgba(34, 197, 94, 0.08)",
          }}
          contentStyle={{
            background: isLightMode
              ? "rgba(200, 200, 200, 0.1)"
              : "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(5px)",
            borderRadius: "15px",
            border: tooltipBorder,
            boxShadow:
              "0 10px 30px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
          labelStyle={{
            color: isLightMode ? "#0f172a" : "white",
          }}
          itemStyle={{
            color: isLightMode ? "#008800" : "#22c55e",
          }}
        />

        <Bar dataKey="users" fill="#22c55e" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
