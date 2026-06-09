import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../components/UsersPage/users.types";

type UserContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  reloadCurrentUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  function reloadCurrentUser() {
    const storedUsername = localStorage.getItem("username");
    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) {
      setCurrentUser(null);
      return;
    }
    const users: User[] = JSON.parse(savedUsers);
    const foundUser = users.find(
      (user) => user.name.toLowerCase() === storedUsername?.toLowerCase(),
    );
    setCurrentUser(foundUser || null);
  }

  useEffect(() => {
    reloadCurrentUser();
    window.addEventListener("usersUpdated", reloadCurrentUser);
    return () => {
      window.removeEventListener("usersUpdated", reloadCurrentUser);
    };
  }, []);

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
