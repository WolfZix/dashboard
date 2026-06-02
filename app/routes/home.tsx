import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.server";
import HomeLoading from "../components/OverviewPage/OverviewLoading";
import OverviewPage from "../components/OverviewPage/OverviewPage";
import type { DashboardData } from "../services/dashboard.types";

export default function Home() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDashboardData();
      setData(result);
    }
    loadData();
  }, []);

  return data ? <OverviewPage data={data} /> : <HomeLoading />;
}
