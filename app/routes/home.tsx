import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import StatCard from "../components/stat-card";
import HomeLoading from "../components/HomeLoading";
import RecentActivities from "../components/RecentActivities";
import OverviewChart from "../components/OverviewChart";
import DailyNews from "../components/DailyNews";

import { getDasboardData } from "../services/dashboard.server";

type DashboardData = {
  stats: {
    revenue: string;
    users: string;
    orders: string;
    conversion: string;
  };

  chart: {
    name: string;
    revenue: number;
  }[];

  activity: string[];

  news: string[];
};

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDasboardData();

      setData(result);
    }

    loadData();
  }, []);

  if (!data) {
    return <HomeLoading />;
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15 }}
        className="space-y-6"
      >
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
          <OverviewChart chart={data.chart} />

          <RecentActivities activities={data.activity} />

          <DailyNews news={data.news} />
        </div>
      </motion.div>
    </div>
  );
}
