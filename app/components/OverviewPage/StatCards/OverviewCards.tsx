import StatCard from "../StatCards/stat-card";

type OverviewCards = {
  stats: {
    revenue: string;
    users: string;
    orders: string;
    conversion: string;
  };
};

export default function OverviewCards({ stats }: OverviewCards) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard title="Revenue" value={stats.revenue} change="12.4%" />
      <StatCard title="Users" value={stats.users} change="0%" />
      <StatCard title="Orders" value={stats.orders} change="8.1%" />
      <StatCard title="Conversion" value={stats.conversion} change="-1.1%" />
    </div>
  );
}
