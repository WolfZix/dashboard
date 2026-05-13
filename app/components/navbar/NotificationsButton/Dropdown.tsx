import { useEffect, useState } from "react";
import { getDasboardData } from "../../../services/dashboard.server";
import NotificationCard from "./NotificationCard";

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
  notifications: {
    from: string;
    title: string;
    date: string;
    description: string;
  }[];
};

export default function Dropdown() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDasboardData();
      setData(result);
    }
    loadData();
  }, []);

  return (
    <div
      className="
        absolute
        top-14
        right-0
        w-96
        max-h-125
        overflow-y-auto
        rounded-2xl
        border
        scrollbar-thumb-[white]
        light:scrollbar-thumb-slate-200
        backdrop-blur-xl
        border-slate-700
        light:bg-[#f8fafc]
        light:border-[#e2e8f0]
        shadow-2xl
        z-50
      "
    >
      <div className="p-4 border-b border-slate-700 light:border-[#e2e8f0]">
        <h2 className="font-semibold text-lg">Notifications</h2>
      </div>
      <div className="p-2 space-y-2">
        {data?.notifications.map((notification, index) => {
          return (
            <div key={index}>
              <NotificationCard notificationData={notification} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
