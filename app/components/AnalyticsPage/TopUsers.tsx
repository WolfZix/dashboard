import { Trophy } from "lucide-react";
import type { User } from "../UsersPage/users.types";

type TopUsersProps = {
  users: User[];
};

export default function TopUsers({ users }: TopUsersProps) {
  const topUsers = [...users].sort((a, b) => b.commits - a.commits).slice(0, 5);
  const medalColors = ["#EECC00", "#90a1b9", "#CC4400"];
  const podiumStyles = [
    "border border-yellow-500/30 bg-gradient-to-tr from-yellow-500/15 to-transparent",
    "border border-white/30 bg-gradient-to-tr from-white/15 to-transparent light:border-slate-400/30 light:from-slate-400/15",
    "border border-orange-700/30 bg-gradient-to-tr from-orange-700/15 to-transparent",
  ];

  return (
    <>
      {topUsers.map((user, index) => (
        <div
          key={user.id}
          className={`dashboard-stat-box flex items-center justify-between ${podiumStyles[index] || ""}`}
        >
          <div>
            <p className="dashboard-title flex gap-2">
              {user.name}
              {index < 3 && (
                <Trophy size={16} style={{ color: medalColors[index] }} />
              )}
            </p>
            <p className="dashboard-subtitle">{user.commits} commits</p>
          </div>

          <span
            className={`font-semibold ${
              index === 0
                ? "text-yellow-500"
                : index === 1
                  ? "text-white light:text-slate-400"
                  : index === 2
                    ? "text-orange-700"
                    : "text-lime-500"
            }`}
          >
            #{index + 1}
          </span>
        </div>
      ))}
    </>
  );
}
