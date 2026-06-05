import MostUsedColors from "./MostUsedColors";
import UserGrowthChart from "./UserGrowthChart";
import RolesOverview from "./RolesOverview";
import TopUsers from "./TopUsers";
import UserStatusDistribution from "./UserStatusDistribution";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboard.server";
import type { User } from "../UsersPage/users.types";

export default function AnalyticsPage() {
  // MAIN LOGIC
  // const levels = [
  //   "bg-slate-800",
  //   "bg-lime-500/20",
  //   "bg-lime-500/40",
  //   "bg-lime-500/70",
  //   "bg-lime-500",
  // ];

  // FOR FUN - A pattern that spells WOLFEZIX (1 = active | 0 = inactive)
  const pattern = [
    "1101010110000000000000000000000000000000000000000000110101011",
    "1010101010010001001110010000111011110111110101000100101010101",
    "1101010110010001010001010000100010000000100100101000110101011",
    "1010101010010101010001010000111011100001000100010000101010101",
    "1101010110011011010001010000100010000010000100101000110101011",
    "1010101010010001001110011110100011110111110101000100101010101",
    "1101010110000000000000000000000000000000000000000000110101011",
  ];

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadUsers() {
      const savedUsers = localStorage.getItem("users");

      if (savedUsers) {
        setUsers(JSON.parse(savedUsers));
        return;
      }

      const result = await getDashboardData();
      setUsers(result.usersData);
      localStorage.setItem("users", JSON.stringify(result.usersData));
    }

    loadUsers();
  }, []);

  return (
    <div className="space-y-6 compact:space-y-3">
      <h1 className="dashboard-heading">Analytics</h1>

      {/* Activity Heatmap */}
      <div className="dashboard-card rounded-2xl p-5 compact:p-3">
        <h2 className="dashboard-title mb-4">Activity Heatmap</h2>

        {/* MAIN LOGIC */}
        {/* <div className="grid grid-cols-61 gap-1">
          {Array.from({ length: 366 }).map((_, index) => (
            <div
              key={index}
              className={`aspect-square rounded-[3px] ${levels[Math.floor(Math.random() * levels.length)]}`}
            />
          ))}
        </div> */}

        {/* FOR FUN */}
        <div className="grid grid-cols-61 gap-1">
          {Array.from({ length: 427 }).map((_, index) => {
            const row = Math.floor(index / 61);
            const col = index % 61;

            const isActive =
              row < pattern.length &&
              col < pattern[row].length &&
              pattern[row][col] === "1";

            return (
              <div
                key={index}
                className={`aspect-square rounded ${
                  isActive
                    ? "bg-lime-500 light:bg-lime-800"
                    : "bg-slate-700 light:bg-slate-300"
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 mt-4">
        <span className="text-xs dashboard-muted-text">Less</span>

        <div className="w-3 h-3 rounded bg-slate-800" />
        <div className="w-3 h-3 rounded bg-lime-500/20" />
        <div className="w-3 h-3 rounded bg-lime-500/40" />
        <div className="w-3 h-3 rounded bg-lime-500/70" />
        <div className="w-3 h-3 rounded bg-lime-500" />

        <span className="text-xs dashboard-muted-text">More</span>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 compact:gap-2">
        <div className="dashboard-card rounded-2xl p-5 compact:p-3 h-96">
          <h2 className="dashboard-title mb-4">User Growth</h2>

          <div className="h-full flex items-center justify-center dashboard-muted-text">
            <UserGrowthChart users={users} />
          </div>
        </div>

        <div className="dashboard-card rounded-2xl p-5 compact:p-3 h-96">
          <h2 className="dashboard-title mb-4">Most Used Colors</h2>

          <div className="h-[calc(100%-40px)]">
            <MostUsedColors users={users} />
          </div>
        </div>
      </div>

      {/* Top users + roles */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 compact:gap-2">
        <div className="dashboard-card rounded-2xl p-5 compact:p-3">
          <h2 className="dashboard-title mb-4">Top Users</h2>

          <div className="space-y-3">
            <TopUsers users={users} />
          </div>
        </div>

        <div className="dashboard-card rounded-2xl p-5 compact:p-3">
          <h2 className="dashboard-title mb-4">Roles Overview</h2>

          <div className="space-y-3">
            <RolesOverview users={users} />
          </div>
        </div>
      </div>

      {/* User status */}
      <div className="dashboard-card rounded-2xl p-5 compact:p-3">
        <h2 className="dashboard-title mb-6">User Status Distribution</h2>

        <div className="space-y-4">
          <UserStatusDistribution users={users} />
        </div>
      </div>
    </div>
  );
}
