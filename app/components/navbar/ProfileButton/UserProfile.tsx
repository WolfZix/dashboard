import { useEffect, useState } from "react";
import ProfileDropdown from "../ProfileButton/ProfileDropdown";
import { AnimatePresence } from "framer-motion";
import type { User } from "../../UsersPage/users.types";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const currentUserLetter = currentUser?.name[0].toUpperCase();
  const currentUsersRole = currentUser?.role || "User";
  const currentUsersColor = currentUser?.color || "#22c55e";
  const currentUsersTextColor = currentUser?.textColor || "#000000";
  const currentUsersProfilePicture = currentUser?.avatar || "";

  useEffect(() => {
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
          text-xl
          transition-all
          duration-300
          "
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
        duration-300
        cursor-pointer
        light:text-[#0f172a]
        light:hover:text-slate-950
      `}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          style={{
            backgroundColor: currentUsersColor,
            color: currentUsersTextColor,
            borderColor: currentUsersColor,
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
          border
          transition-all
          duration-300
        `}
        >
          {currentUsersProfilePicture ? (
            <img
              src={currentUsersProfilePicture}
              className="w-full h-full object-cover rounded-full scale-[0.99] border-2 borde-black"
            />
          ) : (
            currentUserLetter
          )}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <ProfileDropdown
            userName={currentUser?.name || "Guest"}
            userPicture={currentUsersProfilePicture}
            userRole={currentUsersRole}
            userLetter={currentUserLetter || "G"}
            userColor={currentUsersColor}
            userTextColor={currentUsersTextColor}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
