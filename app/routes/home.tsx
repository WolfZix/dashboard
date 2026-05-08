import StatCard from "../components/stat-card";
import { useLoaderData } from "react-router";
import { getDasboardData } from "~/services/dashboard.server";
import { motion } from "framer-motion";

export async function loader() {
  const data = await getDasboardData();
  return data;
}

export default function Home() {
  const data = useLoaderData<typeof loader>();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold">Dashboard overview 🚀</h1>
        <p className="text-slate-400 mt-1">
          Welcome back, here’s what’s happening.
        </p>
      </div>

      {/* Dziwne formatowanie Prettier */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <StatCard title="Revenue" value={data.stats.revenue} change="+12.4%" />
        <StatCard title="Users" value={data.stats.users} change="+5.2%" />
        <StatCard title="Orders" value={data.stats.orders} change="+8.1%" />
        <StatCard
          title="Conversion"
          value={data.stats.conversion}
          change="+1.1%"
        />
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-slate-900 border border-slate-700 rounded-2xl p-5 h-80">
          <h2 className="font-semibold mb-2">Traffic overview</h2>
          <p className="text-slate-400 text-sm">Wykres</p>
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
  );
}
