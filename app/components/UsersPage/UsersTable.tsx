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
    id: number;
    name: string;
    role: string;
    status: string;
    joined: string;
  }[];
};

export default function UsersTable() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 6;
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [hasUserSorted, setHasUserSorted] = useState(false);

  const [sortBy, setSortBy] = useState<
    "id" | "name" | "role" | "status" | "joined"
  >("id");

  const filteredUsers = data?.UsersData.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedUsers = [...(filteredUsers || [])].sort((a, b) => {
    if (!sortOrder) {
      return 0;
    }

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

    if (sortBy === "id") {
      return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    }

    const aValue = a[sortBy].toLowerCase();
    const bValue = b[sortBy].toLowerCase();

    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const visibleUsers = sortedUsers.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const pages = Math.ceil((filteredUsers?.length || 0) / PAGE_SIZE) || 1;

  function handleSort(column: "id" | "name" | "role" | "status" | "joined") {
    setHasUserSorted(true);

    if (sortBy !== column) {
      setSortBy(column);
      setSortOrder("asc");
      return;
    }

    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder(null);
    } else {
      setSortOrder("asc");
    }
  }

  function renderSortIcon(
    column: "id" | "name" | "role" | "status" | "joined",
  ) {
    if (!hasUserSorted) {
      return <ArrowUpDown size={18} className="opacity-30" />;
    }
    if (sortBy !== column) {
      return <ArrowUpDown size={18} className="opacity-30" />;
    }
    if (sortOrder === "asc") {
      return <ArrowDown size={18} />;
    }
    if (sortOrder === "desc") {
      return <ArrowUp size={18} />;
    }
    return <ArrowUpDown size={18} className="opacity-30" />;
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
              <th onClick={() => handleSort("id")}>
                <span className="flex justify-center gap-2 items-center">
                  ID
                  {renderSortIcon("id")}
                </span>
              </th>
              <th onClick={() => handleSort("name")}>
                <span className="flex justify-center gap-2 items-center">
                  Username
                  {renderSortIcon("name")}
                </span>
              </th>
              <th onClick={() => handleSort("role")}>
                <span className="flex justify-center gap-2 items-center">
                  Role
                  {renderSortIcon("role")}
                </span>
              </th>
              <th onClick={() => handleSort("status")}>
                <span className="flex justify-center gap-2 items-center">
                  Status
                  {renderSortIcon("status")}
                </span>
              </th>
              <th onClick={() => handleSort("joined")}>
                <span className="flex justify-center gap-2 items-center">
                  Join date
                  {renderSortIcon("joined")}
                </span>
              </th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {visibleUsers?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
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
