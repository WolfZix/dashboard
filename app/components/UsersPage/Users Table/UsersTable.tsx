import { useEffect, useState } from "react";
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
import { getUserByName } from "../../../services/userService";
import { getUsername, setUsername } from "../../../services/authService";
import { useUsers } from "../../../context/UsersContext";

export default function UsersTable() {
  const { users, createUser, updateUser, deleteUser: removeUser } = useUsers();
  const [search, setSearch] = useState("");
  const currentUsername = getUsername();
  const currentUser = currentUsername
    ? getUserByName(currentUsername)
    : undefined;
  const currentUserRole = currentUser?.role || "User";
  console.log({ currentUsername, currentUser, currentUserRole });

  const { canView, canEdit, canDelete, canCreate } = getPermissions(currentUserRole);

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
        {canCreate && (
        <button
          onClick={() => setCreateUserOpen(true)}
          className="dashboard-button-success"
        >
          Add User
        </button>
        )}
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
            const currentUsername = getUsername();
            if (
              currentUsername &&
              editUser &&
              editUser.name === currentUsername
            ) {
              setUsername(updatedUser.name);
            }
            updateUser(updatedUser);
            showToast("User updated successfully");
          }}
        />
      )}
      {deleteUser && (
        <DeleteuserModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onDelete={() => {
            removeUser(deleteUser.id);
            setDeleteUser(null);
            showToast("User deleted successfully");
          }}
        />
      )}
      {createUserOpen && (
        <CreateUserModal
          onClose={() => setCreateUserOpen(false)}
          onCreate={(newUser) => {
            const success = createUser(newUser);
            if (!success) {
              setToast({ type: "error", message: "User already exists" });
              setTimeout(() => {
                setToast(null);
              }, 2000);
              return;
            }
            showToast("User created successfully");
          }}
        />
      )}
      {toast && <Toast type={toast.type} message={toast.message} />}
    </>
  );
}
