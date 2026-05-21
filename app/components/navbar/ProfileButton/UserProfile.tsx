import { useEffect, useState } from "react";
import ProfileDropdown from "../ProfileButton/ProfileDropdown";
import { AnimatePresence } from "framer-motion";
import type { User } from "../../UsersPage/users.types";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const currentUserLetter = currentUser?.name[0].toUpperCase();
  const currentUsersRole = currentUser?.role || "User";
  const currentUsersBackgroundColor = currentUser?.color || "#22c55e";
  const currentUsersTextColor = currentUser?.textColor || "#000000";

  useEffect(() => {
    loadCurrentUser();
    window.addEventListener("usersUpdated", loadCurrentUser);
    return () => {
      window.removeEventListener("usersUpdated", loadCurrentUser);
    };
  }, []);

  function loadCurrentUser() {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) return;

    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) return;

    const users: User[] = JSON.parse(savedUsers);
    const foundUser = users.find(
      (user) => user.name.toLowerCase() === storedUsername.toLowerCase(),
    );
    if (foundUser) setCurrentUser(foundUser);
  }

  if (!currentUser) {
    return (
      <div
        className="h-10
          w-10
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-xl"
      ></div>
    );
  }

  return (
    <div className="relative">
      <button
        id="profileButton"
        className={`
        flex items-center
        transition-all
        cursor-pointer
        light:text-[#0f172a]
        light:hover:text-slate-950
      `}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          style={{
            backgroundColor: currentUsersBackgroundColor,
            color: currentUsersTextColor,
          }}
          className={`
          h-10
          w-10
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-xl
        `}
        >
          {currentUserLetter}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <ProfileDropdown
            userName={currentUser?.name || "Guest"}
            userRole={currentUsersRole}
            userLetter={currentUserLetter || "G"}
            userBackgroundColor={currentUsersBackgroundColor}
            userTextColor={currentUsersTextColor}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
