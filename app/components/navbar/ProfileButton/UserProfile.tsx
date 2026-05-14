import { useState } from "react";
import ProfileDropdown from "../ProfileButton/ProfileDropdown";
import { AnimatePresence } from "framer-motion";

export default function UserProfile() {
  const [open, setOpen] = useState(false);

  const currentUser = "WolfeZix";
  const currentUserLetter = "W";
  const currentUsersRole = "Admin";
  const currentUsersBackgroundColor = "bg-green-500";
  const currentUsersTextColor = "text-black";

  return (
    <div className="relative">
      <button
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
          className={`
          h-10
          w-10
          rounded-full
          ${currentUsersBackgroundColor}
          flex
          items-center
          justify-center
          ${currentUsersTextColor}
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
            userName={currentUser}
            userRole={currentUsersRole}
            userLetter={currentUserLetter}
            userBackgroundColor={currentUsersBackgroundColor}
            userTextColor={currentUsersTextColor}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
