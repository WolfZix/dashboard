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
  return (
    <div className="xl:col-span-2 bg-[#0b1220] border border-slate-800 rounded-2xl p-5 h-80">
      <h2 className="font-semibold mb-4 text-slate-200">Revenue</h2>

      <ResponsiveContainer width="100%" height="90%">
        <AreaChart data={chart}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />

              <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#1f2937"
            strokeDasharray="10"
            vertical={false}
          />

          <XAxis dataKey="name" stroke="#64748b" />

          <YAxis stroke="#64748b" />

          <Tooltip
            contentStyle={{
              color: "white",
              background: "transparent",
              backdropFilter: "blur(5px)",
              borderRadius: "15px",
              border: "1px solid hsla(225, 0%, 100%, 0.15)",
              boxShadow:
                "0 10px 30px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.25)",
            }}
          />

          <Area
            type="linear"
            dataKey="revenue"
            stroke="#22c55e"
            fill="url(#colorRevenue)"
            strokeWidth={2.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
