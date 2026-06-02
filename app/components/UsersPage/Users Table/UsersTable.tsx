import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboard.server";
import "../UsersPage.css";
import UsersPagination from "../UsersPagination";
import UsersSearch from "./UsersSearch";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";
import type { SortBy, SortOrder, User } from "../users.types";
import { sortUsers, getPermissions } from "../users.helpers";
import ViewUserModal from "../CRUD/ViewUserModal";
import EditUserModal from "../CRUD/EditUserModal";
import DeleteuserModal from "../CRUD/DeleteUserModal";
import CreateUserModal from "../CRUD/CreateUserModal";
import Toast from "../Toast";
import { useMode } from "../../../context/ModeContext";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const currentUsername = localStorage.getItem("username");
  const currentUser = users.find((user) => user.name === currentUsername);
  const currentUserRole = currentUser?.role || "User";
  const { canView, canEdit, canDelete } = getPermissions(currentUserRole);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState<SortBy>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [hasUserSorted, setHasUserSorted] = useState(false);

  const { mode } = useMode();
  const isCompact = mode === "compact";
  const PAGE_SIZE = isCompact ? 10 : 6;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedUsers = sortUsers(filteredUsers, sortBy, sortOrder);
  const visibleUsers = sortedUsers.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const pages = Math.ceil(filteredUsers.length / PAGE_SIZE) || 1;
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

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

  function showToast(message: string) {
    setToast({
      type: "success",
      message,
    });
    setTimeout(() => {
      setToast(null);
    }, 2000);
  }

  return (
    <>
      <div className="flex justify-between items-end">
        <UsersSearch search={search} setSearch={setSearch} />
        <button
          onClick={() => setCreateUserOpen(true)}
          className="px-5 py-3 compact:px-3 compact:py-1.5 h-fit rounded-xl compact:rounded-lg bg-green-700 hover:bg-green-600 transition-all duration-300 cursor-pointer"
        >
          Add User
        </button>
      </div>
      <div className="usersTableWrapper transition-all duration-300">
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
                setDeleteUser={setDeleteUser}
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
            showToast("User updated successfully");
          }}
        />
      )}
      {deleteUser && (
        <DeleteuserModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onDelete={() => {
            const updatedUsers = users.filter((u) => u.id !== deleteUser.id);
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setDeleteUser(null);
            showToast("User deleted successfully");
          }}
        />
      )}
      {createUserOpen && (
        <CreateUserModal
          onClose={() => setCreateUserOpen(false)}
          onCreate={(newUser) => {
            const updatedUsers = [...users, newUser];
            setUsers(updatedUsers);
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            showToast("User created successfully");
          }}
        />
      )}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </>
  );
}
