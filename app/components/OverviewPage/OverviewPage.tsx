import DailyNews from "./DailyNews/DailyNews";
import OverviewCards from "./StatCards/OverviewCards";
import OverviewChart from "./OverviewChart";
import RecentActivities from "./RecentActivities";
import type { DashboardData } from "../../services/dashboard.types";

type OverviewPageProps = {
  data: DashboardData;
};

export default function OverviewPage({ data }: OverviewPageProps) {
  return (
    <div className="space-y-6 compact:space-y-3 noAnimations:transition-none">
      <OverviewCards stats={data.stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 compact:xl:grid-cols-4 compact:gap-2 noAnimations:transition-none">
        <OverviewChart chart={data.chart} />
        <RecentActivities activities={data.activity} />
        <DailyNews news={data.news} />
      </div>
    </div>
  );
}
