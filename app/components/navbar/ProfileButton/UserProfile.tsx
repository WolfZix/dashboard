import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ProfileDropdown from "../ProfileButton/ProfileDropdown";
import { useAnimations } from "../../../context/AnimationContext";
import { useUser } from "../../../context/UserContext";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const { currentUser, setCurrentUser } = useUser();
  const currentUserColor = currentUser?.color || "#22c55e";
  const currentUserLetter = currentUser?.name[0].toUpperCase();
  const currentUsersRole = currentUser?.role || "User";
  const currentUsersTextColor = currentUser?.textColor || "#000000";
  const currentUsersAvatar = currentUser?.avatar || "";
  const { canAnimate } = useAnimations();

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
            backgroundColor: currentUserColor,
            color: currentUsersTextColor,
            borderColor: currentUserColor,
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
          {currentUsersAvatar ? (
            <img
              src={currentUsersAvatar}
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
            userPicture={currentUsersAvatar}
            userRole={currentUsersRole}
            userLetter={currentUserLetter || "G"}
            userColor={currentUserColor}
            userTextColor={currentUsersTextColor}
            canAnimate={canAnimate}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
