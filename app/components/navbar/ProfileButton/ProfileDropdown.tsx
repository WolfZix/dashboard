import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboard.server";
import { Settings, LucideUser, LucideLogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

type DashboardData = {
  profileOptions: {
    name: string;
    icon: string;
    path: string;
  }[];
};

type profileDropdownProps = {
  userName: string;
  userPicture: string;
  userRole: string;
  userLetter: string;
  userColor: string;
  userTextColor: string;
  onClose: () => void;
};

function shortenUserName(userName: string) {
  return userName.slice(0, 10) + "...";
}

export default function ProfileDropdown({
  userName,
  userPicture,
  userRole,
  userLetter,
  userColor,
  userTextColor,
  onClose,
}: profileDropdownProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const displayName =
    userName.length > 10 ? shortenUserName(userName) : userName;

  const iconMap = {
    user: LucideUser,
    settings: Settings,
    logout: LucideLogOut,
  };

  useEffect(() => {
    async function loadData() {
      const result = await getDashboardData();
      setData(result);
    }
    loadData();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const dropdown = document.getElementById("profileDropdown");
      if (dropdown && !dropdown.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function clearLocalStorage(optionName: string) {
    if (optionName === "Log Out") {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    onClose();
  }

  return (
    <motion.div
      id="profileDropdown"
      initial={{
        opacity: 0,
        y: -30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -30,
      }}
      transition={{
        duration: 0.15,
      }}
      className="
    flex flex-col gap-2 
    absolute 
    top-full
    w-52
    right-0 
    min-h-10 
    bg-slate-900
    border border-slate-700
    light:bg-[white]
    light:border-[#e2e8f0]
    rounded-xl
    rounded-tr-none
    text-left
    z-50

    "
    >
      <div className="flex items-center m-2">
        <div
          style={{
            backgroundColor: userColor,
            color: userTextColor,
            borderColor: userColor,
          }}
          className={`rounded-full font-bold w-10 h-10 mr-2 flex justify-center items-center text-xl border`}
        >
          {userPicture ? (
            <img
              src={userPicture}
              className="w-full h-full object-cover rounded-full scale-[0.97] border-2 border-black"
            />
          ) : (
            userLetter
          )}
        </div>
        <div className="flex flex-col">
          <h1 className=" text-base">{displayName}</h1>
          <p className="text-slate-400 text-xs">{userRole}</p>
        </div>
      </div>
      <hr className="text-slate-500" />
      {data?.profileOptions.map((option) => {
        const isLogout = option.name === "Log Out";
        console.log(option.path);
        const Icon = iconMap[option.icon as keyof typeof iconMap];
        return (
          <NavLink
            to={
              option.name === "Profile"
                ? `/profile/${userName}`
                : option.name === "Log Out"
                  ? "/login"
                  : option.path
            }
            key={option.name}
            onClick={() => clearLocalStorage(option.name)}
            className={`
        text-base
        rounded-md
        py-2
        px-3
        cursor-pointer
        transition-colors
        hover:bg-slate-700
        light:hover:bg-slate-200

        ${
          isLogout
            ? "text-red-300 hover:text-red-500"
            : "text-slate-400 hover:text-white light:text-slate-500 light:hover:text-[#0f172a]"
        }
      `}
          >
            <div className="flex items-center gap-3">
              <Icon size={18} />
              <div>{option.name}</div>
            </div>
          </NavLink>
        );
      })}
    </motion.div>
  );
}
