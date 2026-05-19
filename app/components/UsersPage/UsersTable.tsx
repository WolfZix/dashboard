import { useEffect, useState } from "react";
import { getDasboardData } from "../../services/dashboard.server";
import {
  Eye,
  Pencil,
  Trash,
  Search,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
} from "lucide-react";
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
  const [sortBy, setSortBy] = useState<"name" | "role" | "status" | "joined">(
    "role",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const sortedUsers = [...(filteredUsers || [])].sort((a, b) => {
    if (sortBy === "status") {
      const statusOrder = {
        Online: 4,
        Busy: 3,
        Away: 2,
        Offline: 1,
      };

      const aStatus = statusOrder[a.status as keyof typeof statusOrder];
      const bStatus = statusOrder[b.status as keyof typeof statusOrder];

      return sortOrder === "asc" ? bStatus - aStatus : aStatus - bStatus;
    }

    const aValue = a[sortBy].toLowerCase();

    const bValue = b[sortBy].toLowerCase();

    if (sortOrder === "asc") {
      return aValue.localeCompare(bValue);
    }

    return bValue.localeCompare(aValue);
  });
  const statusOrder = { Online: 4, Busy: 3, Away: 2, Offline: 1 };
  const visibleUsers = sortedUsers.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const pages = Math.ceil((filteredUsers?.length || 0) / PAGE_SIZE) || 1;

  function handleSort(column: "name" | "role" | "status" | "joined") {
    if (sortBy === column) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }

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
              <th onClick={() => handleSort("name")}>
                <span className="flex justify-center gap-2 items-center">
                  Username
                  {sortBy === "name" ? (
                    sortOrder === "asc" ? (
                      <ArrowDown size={18} />
                    ) : (
                      <ArrowUp size={18} />
                    )
                  ) : (
                    <ArrowUpDown size={18} className="opacity-30" />
                  )}
                </span>
              </th>
              <th onClick={() => handleSort("role")}>
                <span className="flex justify-center gap-2 items-center">
                  Role
                  {sortBy === "role" ? (
                    sortOrder === "asc" ? (
                      <ArrowDown size={18} />
                    ) : (
                      <ArrowUp size={18} />
                    )
                  ) : (
                    <ArrowUpDown size={18} className="opacity-30" />
                  )}
                </span>
              </th>
              <th onClick={() => handleSort("status")}>
                <span className="flex justify-center gap-2 items-center">
                  Status
                  {sortBy === "status" ? (
                    sortOrder === "asc" ? (
                      <ArrowDown size={18} />
                    ) : (
                      <ArrowUp size={18} />
                    )
                  ) : (
                    <ArrowUpDown size={18} className="opacity-30" />
                  )}
                </span>
              </th>
              <th onClick={() => handleSort("joined")}>
                <span className="flex justify-center gap-2 items-center">
                  Join date (DD/MM/RRRR)
                  {sortBy === "joined" ? (
                    sortOrder === "asc" ? (
                      <ArrowDown size={18} />
                    ) : (
                      <ArrowUp size={18} />
                    )
                  ) : (
                    <ArrowUpDown size={18} className="opacity-30" />
                  )}
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers?.map((user, index) => (
              <tr>
                <td>{page * PAGE_SIZE + index + 1}</td>
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
