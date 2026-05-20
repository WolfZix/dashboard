import { useEffect, useState } from "react";
import ProfileDropdown from "../ProfileButton/ProfileDropdown";
import { AnimatePresence } from "framer-motion";
import { getDashboardData } from "../../../services/dashboard.server";
import type { User } from "../../UsersPage/users.types";

export default function UserProfile() {
  useEffect(() => {
    async function loadUser() {
      const storedUser = localStorage.getItem("username");
      if (!storedUser) return;
      setCurrentUser(storedUser);
      const data = await getDashboardData();
      const foundUser = data.UsersData.find(
        (user) => user.name.toLowerCase() === storedUser.toLowerCase(),
      );
      if (foundUser) setCurrentUserData(foundUser);
    }
    loadUser();
  }, []);

  const [currentUser, setCurrentUser] = useState("");
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const currentUserLetter = currentUser[0]?.toUpperCase();
  const currentUsersRole = currentUserData?.role || "User";
  const currentUsersBackgroundColor = currentUserData?.color || "#22c55e";
  const currentUsersTextColor = "#000000";

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
          {currentUser[0]}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <ProfileDropdown
            userName={currentUser}
            userRole={currentUsersRole}
            userLetter={currentUserLetter}
            userBackgroundColor={currentUsersBackgroundColor}
            userTextColor={currentUsersTextColor}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
