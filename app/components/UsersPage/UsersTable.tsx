import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/dashboard.server";
import "./UsersPage.css";
import UsersPagination from "./UsersPagination";
import UsersSearch from "./UsersSearch";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";
import type { SortBy, SortOrder, User } from "./users.types";
import { sortUsers, getPermissions } from "./users.helpers";
import ViewUserModal from "./ViewUserModal";
import EditUserModal from "./EditUserModal";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 6;
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [hasUserSorted, setHasUserSorted] = useState(false);
  const currentUsername = localStorage.getItem("username");
  const currentUser = users.find((user) => user.name === currentUsername);
  const currentUserRole = currentUser?.role || "User";
  const { canView, canEdit, canDelete } = getPermissions(currentUserRole);

  const filteredUsers =
    users.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const sortedUsers = sortUsers(filteredUsers, sortBy, sortOrder);
  const visibleUsers = sortedUsers.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const pages = Math.ceil(filteredUsers.length / PAGE_SIZE) || 1;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);

  function handleSort(column: SortBy) {
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

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      return;
    }
    async function loadData() {
      const result = await getDashboardData();
      setUsers(result.UsersData);
      localStorage.setItem("users", JSON.stringify(result.UsersData));
    }
    loadData();
  }, []);

  useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <>
      <UsersSearch search={search} setSearch={setSearch} />
      <div className="usersTableWrapper">
        <table className="usersTable">
          <UsersTableHeader
            sortBy={sortBy}
            sortOrder={sortOrder}
            hasUserSorted={hasUserSorted}
            handleSort={handleSort}
          />
          <tbody>
            {visibleUsers.map((user) => (
              <UsersTableRow
                key={user.id}
                user={user}
                canView={canView}
                canEdit={canEdit}
                canDelete={canDelete}
                setSelectedUser={setSelectedUser}
                setEditingUser={setEditUser}
              />
            ))}
          </tbody>
        </table>
      </div>
      <UsersPagination page={page} setPage={setPage} pages={pages} />
      {selectedUser && (
        <ViewUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      {editUser && (
        <EditUserModal
          currentUserRole={currentUserRole}
          user={editUser!}
          onClose={() => setEditUser(null)}
          onSave={(updatedUser) => {
            const updatedUsers = users.map((u) => {
              if (u.id === updatedUser.id) {
                return updatedUser;
              }
              return u;
            });
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
          }}
        />
      )}
    </>
  );
}
