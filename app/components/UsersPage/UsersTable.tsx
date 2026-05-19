import { useEffect, useState } from "react";
import { getDasboardData } from "../../services/dashboard.server";
import { Eye, Pencil, Trash, Search } from "lucide-react";
import "./UsersPage.css";
import UsersPagination from "./UsersPagination";

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
  const [search, setSearch] = useState("");
  const filteredUsers = data?.UsersData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const [page, setPage] = useState(0);
  const PAGE_SIZE = 6;
  const visibleUsers = filteredUsers?.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const pages = Math.ceil((filteredUsers?.length || 0) / PAGE_SIZE) || 1;

  useEffect(() => {
    async function loadData() {
      const result = await getDasboardData();
      setData(result);
    }
    loadData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <>
      <div className="usersSearchWrapper">
        <input
          type="text"
          className="usersSearch"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search size={18} className="usersSearchIcon" />
      </div>
      <div className="usersTableWrapper">
        <table className="usersTable">
          <thead>
            <tr>
              <th>Lp.</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Join date (DD/MM/RRRR)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers?.map((user, index) => (
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
          </tbody>
        </table>
      </div>
      <UsersPagination page={page} setPage={setPage} pages={pages} />
    </>
  );
}
