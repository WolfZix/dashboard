import MostUsedColors from "./MostUsedColors";
import UserGrowthChart from "./UserGrowthChart";
import RolesOverview from "./RolesOverview";
import TopUsers from "./TopUsers";
import UserStatusDistribution from "./UserStatusDistribution";
import { useUsers } from "../../context/UsersContext";

export default function AnalyticsPage() {
  const { users } = useUsers();
  // MAIN LOGIC
  // const levels = [
  //   "bg-slate-800",
  //   "bg-lime-500/20",
  //   "bg-lime-500/40",
  //   "bg-lime-500/70",
  //   "bg-lime-500",
  // ];

  // FOR FUN - A pattern that spells WELCOME! (1 = active | 0 = inactive)
  const pattern = [
    "1101010110000000000000000000000000000000000000000000110101011",
    "1010101010010001011110100000111001110010001011110100101010101",
    "1101010110010001010000100001000010001011011010000100110101011",
    "1010101010010101011100100001000010001010101011100100101010101",
    "1101010110011011010000100001000010001010001010000000110101011",
    "1010101010010001011110111100111001110010001011110100101010101",
    "1101010110000000000000000000000000000000000000000000110101011",
  ];

  return (
    <div>
      {/* Activity Heatmap */}
      <div className="dashboard-card rounded-2xl p-5 compact:p-3 mb-4 compact:mb-2">
        <h2 className="dashboard-title mb-4 compact:mb-2">Activity Heatmap</h2>

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
                className={`aspect-square rounded transition-all duration-300 ${
                  isActive
                    ? "bg-lime-500 light:bg-lime-600"
                    : "bg-slate-700 light:bg-slate-300"
                }`}
              />
            );
          })}
        </div>
      </div>
      <div className="flex justify-end items-center gap-2 my-4 compact:gap-1 compact:my-2">
        <span className="text-xs dashboard-muted-text transition-all duration-300">
          Less
        </span>

        <div className="w-3 h-3 rounded bg-slate-700 light:bg-slate-300 transition-all duration-300" />
        <div className="w-3 h-3 rounded bg-lime-500/25 light:bg-lime-600/25 transition-all duration-300" />
        <div className="w-3 h-3 rounded bg-lime-500/50 light:bg-lime-600/50 transition-all duration-300" />
        <div className="w-3 h-3 rounded bg-lime-500/75 light:bg-lime-600/75 transition-all duration-300" />
        <div className="w-3 h-3 rounded bg-lime-500 light:bg-lime-600 transition-all duration-300" />

        <span className="text-xs dashboard-muted-text">More</span>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 compact:gap-2 my-4 compact:my-2">
        <div className="dashboard-card rounded-2xl p-5 compact:p-3 h-96">
          <h2 className="dashboard-title mb-4 compact:mb-2 transition-all duration-300">
            User Growth
          </h2>

          <div className="h-full flex items-center justify-center dashboard-muted-text transition-all duration-300">
            <UserGrowthChart users={users} />
          </div>
        </div>

        <div className="dashboard-card rounded-2xl p-5 compact:p-3 h-96">
          <h2 className="dashboard-title mb-4 compact:mb-2 transition-all duration-300">
            Most Used Colors
          </h2>

          <div className="h-[calc(100%-40px)]">
            <MostUsedColors users={users} />
          </div>
        </div>
      </div>

      {/* Top users + roles */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 compact:gap-2 my-4 compact:my-2">
        <div className="dashboard-card rounded-2xl p-5 compact:p-3">
          <h2 className="dashboard-title mb-4 compact:mb-2 transition-all duration-300">
            Top Users
          </h2>

          <div>
            <TopUsers users={users} />
          </div>
        </div>

        <div className="dashboard-card rounded-2xl p-5 compact:p-3">
          <h2 className="dashboard-title mb-4 compact:mb-2 transition-all duration-300">
            Roles Overview
          </h2>

          <div>
            <RolesOverview users={users} />
          </div>
        </div>
      </div>

      {/* User status */}
      <div className="dashboard-card rounded-2xl p-5 compact:p-3">
        <h2 className="dashboard-title mb-6 compact:mb-3 transition-all duration-300">
          User Status Distribution
        </h2>

        <div>
          <UserStatusDistribution users={users} />
        </div>
      </div>
    </div>
  );
}
