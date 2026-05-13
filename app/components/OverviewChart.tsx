import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type OverviewChartProps = {
  chart: {
    name: string;
    revenue: number;
  }[];
};

export default function OverviewChart({ chart }: OverviewChartProps) {
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

  return (
    <div
      className="
        xl:col-span-2
        bg-[#0b1220]
        border border-slate-800
        light:bg-white
        light:border-[#e2e8f0]
        rounded-2xl
        p-5
        h-80
        light:shadow-[0_1px_3px_rgba(0,0,0,0.1)]
      "
    >
      <h2
        className="
          font-semibold
          mb-4
          text-[#0f172a]
          light:text-slate-950
        "
      >
        Revenue
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={chart}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />

              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="colorRevenueLight" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.5} />

              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke={chartGrid}
            strokeDasharray="10"
            vertical={false}
          />

          <XAxis dataKey="name" stroke={chartText} />

          <YAxis stroke={chartText} />

          <Tooltip
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

          <Area
            type="linear"
            dataKey="revenue"
            stroke="#22a05e"
            fill={
              isLightMode ? "url(#colorRevenueLight)" : "url(#colorRevenue)"
            }
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
