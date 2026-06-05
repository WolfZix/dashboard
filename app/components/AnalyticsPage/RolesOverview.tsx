import type { User } from "../UsersPage/users.types";

export default function RolesOverview() {
  const users = localStorage.getItem("users")
    ? (JSON.parse(localStorage.getItem("users")!) as User[])
    : [];
  const roleCount = users.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );
  const roleData = Object.entries(roleCount)
    .map(([role, count]) => ({
      role,
      count,
    }))
    .sort((a, b) => b.count - a.count);
  return (
    <>
      {roleData.map((role) => (
        <div
          key={role.role}
          className="dashboard-stat-box flex justify-between items-center"
        >
          <span>{role.role}</span>
          <span className="font-semibold">{role.count}</span>
        </div>
      ))}
    </>
  );
}
