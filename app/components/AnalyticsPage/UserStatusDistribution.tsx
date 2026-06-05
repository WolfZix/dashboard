import type { User } from "../UsersPage/users.types";

type UserStatusDistributionProps = {
  users: User[];
};

export default function UserStatusDistribution({
  users,
}: UserStatusDistributionProps) {
  return (
    <>
      <div>
        <div className="flex justify-between mb-1">
          <span className="dashboard-text">Online</span>
          <span className="text-lime-500">128</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 light:bg-slate-200">
          <div className="w-[70%] h-full rounded-full bg-lime-500" />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="dashboard-text">Away</span>
          <span className="text-yellow-500">52</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 light:bg-slate-200">
          <div className="w-[35%] h-full rounded-full bg-yellow-500" />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="dashboard-text">Busy</span>
          <span className="text-red-500">24</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 light:bg-slate-200">
          <div className="w-[20%] h-full rounded-full bg-red-500" />
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="dashboard-text">Offline</span>
          <span className="dashboard-muted-text">317</span>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-800 light:bg-slate-200">
          <div className="w-[90%] h-full rounded-full bg-slate-500" />
        </div>
      </div>
    </>
  );
}
