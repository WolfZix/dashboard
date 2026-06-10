import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../components/UsersPage/users.types";
import {
  getUsers,
  createUser as createUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserservice,
} from "../services/userService";

type UsersContextType = {
  users: User[];
  refreshUsers: () => void;
  createUser: (user: User) => boolean;
  updateUser: (user: User) => void;
  deleteUser: (id: number | "Guest") => void;
};

const UsersContext = createContext<UsersContextType | null>(null);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  function refreshUsers() {
    setUsers(getUsers());
  }
  function createUser(user: User) {
    const success = createUserService(user);
    if (success) refreshUsers();
    return success;
  }
  function updateUser(user: User) {
    updateUserService(user);
    refreshUsers();
  }
  function deleteUser(id: number | "Guest") {
    deleteUserservice(id);
    refreshUsers();
  }
  useEffect(() => {
    refreshUsers();
    window.addEventListener("usersUpdated", refreshUsers);
    return () => window.removeEventListener("usersUpdated", refreshUsers);
  }, []);
  return (
    <UsersContext.Provider
      value={{
        users,
        refreshUsers,
        createUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers must be used within UsersProvider");
  }
  return context;
}
