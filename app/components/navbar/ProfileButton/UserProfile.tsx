import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProfileDropdown from "../ProfileButton/ProfileDropdown";
import { useAnimations } from "../../../context/AnimationContext";
import { useUserColor } from "../../../context/UserColorContext";
import type { User } from "../../UsersPage/users.types";

export default function UserProfile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const { userColor } = useUserColor();
  const currentUserLetter = currentUser?.name[0].toUpperCase();
  const currentUsersRole = currentUser?.role || "User";
  const currentUsersTextColor = currentUser?.textColor || "#000000";
  const currentUsersProfilePicture = currentUser?.avatar || "";
  const { canAnimate } = useAnimations();

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

  if (!currentUser) {
    return (
      <div
        className="
          h-5
          w-5
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-xl
          noAnimations:transition-none
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
        noAnimations:transition-none
        cursor-pointer
        light:text-[#0f172a]
        light:hover:text-slate-950
      `}
        onClick={(e) => {
          setOpen((prev) => !prev);
          e.stopPropagation();
        }}
      >
        <div
          style={{
            backgroundColor: userColor,
            color: currentUsersTextColor,
            borderColor: userColor,
          }}
          className={`
          h-10
          w-10
          compact:h-9
          compact:w-9
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-xl
          border
          noAnimations:transition-none
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
            userColor={userColor}
            userTextColor={currentUsersTextColor}
            canAnimate={canAnimate}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
