import { useEffect, useState } from "react";
import { getDasboardData } from "../../services/dashboard.server";
import { Eye, Pencil, Trash, Search } from "lucide-react";
import "./UsersPage.css";

type DashboardData = {
  UsersData: {
    name: string;
    role: string;
    status: string;
    joined: string;
  }[];
};

export default function UsersTable() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDasboardData();
      setData(result);
    }
    loadData();
  }, []);

  return (
    <>
      <div className="usersSearchWrapper">
        <input
          type="text"
          className="usersSearch"
          placeholder="Search users..."
        />
        <Search size={18} className="usersSearchIcon" />
      </div>
      <div className="usersTableWrapper">
        <table className="usersTable">
          <tr>
            <th>Lp.</th>
            <th>Username</th>
            <th>Role</th>
            <th>Status</th>
            <th>Join date (DD/MM/RRRR)</th>
            <th>Actions</th>
          </tr>
          {data?.UsersData.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                <span className={`status-${user.status.toLowerCase()}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.joined}</td>
              <td>
                <div className="userActions">
                  <button className="userActionBtn">
                    <Eye />
                  </button>
                  <button className="userActionBtn">
                    <Pencil />
                  </button>
                  <button className="userActionBtn userDeleteBtn">
                    <Trash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
