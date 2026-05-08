import { getDasboardData } from "~/services/dashboard.server";
import StatCard from "../components/stat-card";
import { useLoaderData, useNavigation } from "react-router";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export async function loader() {
  const data = await getDasboardData();
  return data;
}

export default function Home() {
  const data = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  // 🔥 ADD: split revenue into up/down segments
  const chartWithTrend = data.chart.map((item, index, arr) => {
    const prev = arr[index - 1]?.revenue;

    return {
      ...item,
      isDown: prev !== undefined ? item.revenue < prev : false,
    };
  });

  const upData = chartWithTrend.map((d, i) => ({
    ...d,
    revenue:
      i > 0 && d.revenue < chartWithTrend[i - 1].revenue ? null : d.revenue,
  }));

  const downData = chartWithTrend.map((d, i) => ({
    ...d,
    revenue:
      i > 0 && d.revenue >= chartWithTrend[i - 1].revenue ? null : d.revenue,
  }));

  return (
    <div className="space-y-6">
      {loading ? (
        <>
          <div className="space-y-2 translate-y-2.5">
            <div className="h-8 w-64 bg-slate-800 animate-pulse rounded translate-y-2.5" />
            <div className="h-4 w-96 bg-slate-800 animate-pulse rounded translate-y-2.5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 translate-y-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-24 bg-slate-800 animate-pulse rounded-2xl translate-y-2.5"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 translate-y-2.5">
            <div className="xl:col-span-2 h-80 bg-slate-800 animate-pulse rounded-2xl translate-y-2.5" />
            <div className="h-80 bg-slate-800 animate-pulse rounded-2xl translate-y-2.5" />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold">Dashboard overview 🚀</h1>
            <p className="text-slate-400 mt-1">
              Welcome back, here’s what’s happening.
            </p>
          </div>

          {/* STATS */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
          >
            <StatCard
              title="Revenue"
              value={data.stats.revenue}
              change="+12.4%"
            />
            <StatCard title="Users" value={data.stats.users} change="+5.2%" />
            <StatCard title="Orders" value={data.stats.orders} change="+8.1%" />
            <StatCard
              title="Conversion"
              value={data.stats.conversion}
              change="+1.1%"
            />
          </motion.div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 bg-[#0b1220] border border-slate-800 rounded-2xl p-5 h-80">
              <h2 className="font-semibold mb-4 text-slate-200">Revenue</h2>

              <ResponsiveContainer width="100%" height="90%">
                <AreaChart data={data.chart}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="#1f2937"
                    strokeDasharray="2 2"
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
                      borderColor: "white",
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

            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
              <h2 className="font-semibold mb-2">Recent activity</h2>
              <ul className="text-sm text-slate-400 space-y-2">
                <li>New user registered</li>
                <li>Order completed</li>
                <li>Payment received</li>
                <li>System backup done</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
