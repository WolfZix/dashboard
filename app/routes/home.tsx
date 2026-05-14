import { useEffect, useState } from "react";

import HomeLoading from "../components/OverviewPage/OverviewLoading";
import RecentActivities from "../components/OverviewPage/RecentActivities";
import OverviewChart from "../components/OverviewPage/OverviewChart";
import OverviewCards from "../components/OverviewPage/StatCards/OverviewCards";
import DailyNews from "../components/OverviewPage/DailyNews/DailyNews";

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
  notifications: object[];
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
      <OverviewCards stats={data.stats} />
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <OverviewChart chart={data.chart} />
        <RecentActivities activities={data.activity} />
        <DailyNews news={data.news} />
      </div>
    </div>
  );
}
