import type { User } from "../UsersPage/users.types";

type UserStatusDistributionProps = {
  users: User[];
};

export default function UserStatusDistribution({
  users,
}: UserStatusDistributionProps) {
  const statusCount = users.reduce(
    (acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const statusOrder: Record<string, number> = {
    Online: 1,
    Busy: 2,
    Away: 3,
    Offline: 4,
  };

  const statusData = Object.entries(statusCount)
    .map(([status, count]) => ({
      status,
      count,
    }))
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const statusColors: Record<string, string> = {
    Online: "bg-lime-500",
    Busy: "bg-red-500",
    Away: "bg-yellow-500",
    Offline: "bg-slate-500",
  };

  return (
    <>
      {statusData.map((item) => {
        const percentage =
          users.length > 0 ? (item.count / users.length) * 100 : 0;

        return (
          <div key={item.status}>
            <div className="flex justify-between mb-1">
              <span className="dashboard-text">{item.status}</span>
              <span>{item.count}</span>
            </div>

            <div className="w-full h-3 rounded-full bg-slate-800 light:bg-slate-200">
              <div
                className={`h-full rounded-full ${statusColors[item.status]}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}
