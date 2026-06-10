import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../components/UsersPage/users.types";
import { getUsername } from "../services/authService";
import { useUsers } from "./UsersContext";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  reloadCurrentUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { users } = useUsers();
  function reloadCurrentUser() {
    const storedUsername = getUsername();
    if (users.length === 0) {
      setCurrentUser(null);
      return;
    }
    const foundUser = storedUsername
      ? users.find(
          (user) => user.name.toLowerCase() === storedUsername.toLowerCase(),
        )
      : null;
    setCurrentUser(foundUser || null);
  }

  useEffect(() => {
    reloadCurrentUser();
  }, [users]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        reloadCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
