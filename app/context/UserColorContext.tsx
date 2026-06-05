import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../components/UsersPage/users.types";

type UserColorContextType = {
  userColor: string;
  setUserColor: React.Dispatch<React.SetStateAction<string>>;
};

const UserColorContext = createContext<UserColorContextType | undefined>(
  undefined,
);

export function UserColorProvider({ children }: { children: ReactNode }) {
  const [userColor, setUserColor] = useState("#22c55e");
  useEffect(() => {
    function loadUserColor() {
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) return;

      const savedUsers = localStorage.getItem("users");
      if (!savedUsers) return;

      const users: User[] = JSON.parse(savedUsers);
      const foundUser = users.find(
        (user) => user.name.toLowerCase() === storedUsername.toLowerCase(),
      );

      if (foundUser?.color) setUserColor(foundUser.color);
    }

    loadUserColor();
    window.addEventListener("usersUpdated", loadUserColor);
    return () => {
      window.removeEventListener("usersUpdated", loadUserColor);
    };
  }, []);

  return (
    <UserColorContext.Provider
      value={{
        userColor,
        setUserColor,
      }}
    >
      {children}
    </UserColorContext.Provider>
  );
}

export function useUserColor() {
  const context = useContext(UserColorContext);
  if (!context) {
    throw new Error("useUserColor must be used within UserColorProvider");
  }
  return context;
}
