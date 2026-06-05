import type { User } from "../UsersPage/users.types";
import { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function MostUsedColors() {
  const users = localStorage.getItem("users")
    ? (JSON.parse(localStorage.getItem("users")!) as User[])
    : [];

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

  const tooltipBorder = isLightMode
    ? "1px solid rgba(0,0,0,0.1)"
    : "1px solid hsla(225, 0%, 100%, 0.15)";

  function getColorGroup(color: string) {
    switch (color.toLowerCase()) {
      case "#fb2c36":
        return "Red";

      case "#ff6900":
        return "Orange";

      case "#f0b100":
        return "Yellow";

      case "#22c55e":
        return "Green";

      case "#00b8db":
        return "Cyan";

      case "#2b7fff":
        return "Blue";

      case "#ad46ff":
        return "Purple";

      case "#f6339a":
        return "Pink";

      case "#000000":
        return "Black";

      case "#ffffff":
        return "White";

      case "#62748e":
        return "Slate";

      default:
        return "Other";
    }
  }

  const COLORS: Record<string, string> = {
    Red: "#fb2c36",
    Orange: "#ff6900",
    Yellow: "#f0b100",
    Green: "#22c55e",
    Cyan: "#00b8db",
    Blue: "#2b7fff",
    Purple: "#ad46ff",
    Pink: "#f6339a",
    Black: "#000000",
    White: "#e5e7eb",
    Slate: "#62748e",
    Other: "#888888",
  };

  const colorCounts = users.reduce(
    (acc, user) => {
      const group = getColorGroup(user.color);
      acc[group] = (acc[group] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const chartData = Object.entries(colorCounts)
    .map(([color, count]) => ({
      color,
      count,
      fill: COLORS[color] || "#888888",
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="h-full flex items-center justify-center flex-row-reverse">
      <div className="w-1/2 h-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{
                background: isLightMode
                  ? "rgba(200, 200, 200, 0.1)"
                  : "rgba(15, 23, 42, 0.85)",
                backdropFilter: "blur(5px)",
                borderRadius: "15px",
                border: tooltipBorder,
              }}
            />

            <Pie
              data={chartData}
              dataKey="count"
              nameKey="color"
              innerRadius={50}
              outerRadius={100}
              paddingAngle={2}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-3xl font-bold">{users.length}</p>
            <p className="text-xs text-slate-400">Users</p>
          </div>
        </div>
      </div>

      <div className="w-fit space-y-2 text-sm">
        {chartData.map((item) => (
          <div
            key={item.color}
            className="flex items-center gap-2 justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              />
              <span>{item.color}</span>
            </div>

            <span className="font-medium">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
