import type { User } from "../UsersPage/users.types";

type RolesOverviewProps = {
  users: User[];
};

export default function RolesOverview({ users }: RolesOverviewProps) {
  const roleCount = users.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const roleOrder: Record<string, number> = {
    Admin: 1,
    Moderator: 2,
    Premium: 3,
    User: 4,
  };

  const roleData = Object.entries(roleCount)
    .map(([role, count]) => ({
      role,
      count,
    }))
    .sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);

  return (
    <>
      {roleData.map((role) => (
        <div
          key={role.role}
          className="dashboard-stat-box my-3 compact:my-1.5 flex justify-between items-center transition-all duration-300"
        >
          <span>{role.role}</span>
          <span className="font-semibold">{role.count}</span>
        </div>
      ))}
    </>
  );
}
