import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDasboardData } from "../../../services/dashboard.server";
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
  userRole: string;
  userLetter: string;
  userBackgroundColor: string;
  userTextColor: string;
};

function shortenUserName(userName: string) {
  return userName.slice(0, 10) + "...";
}

export default function ProfileDropdown({
  userName,
  userRole,
  userLetter,
  userBackgroundColor,
  userTextColor,
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
      const result = await getDasboardData();
      setData(result);
    }
    loadData();
  }, []);

  function clearLocalStorage(optionName: string) {
    if (optionName === "Log Out") {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  }

  return (
    <motion.div
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
          className={`rounded-full ${userTextColor} font-bold ${userBackgroundColor} w-10 h-10 mr-2 flex justify-center items-center text-xl`}
        >
          {userLetter}
        </div>
        <div className="flex flex-col">
          <h1 className=" text-base">{displayName}</h1>
          <p className="text-slate-400 text-xs">{userRole}</p>
        </div>
      </div>
      <hr className="text-slate-500" />
      {data?.profileOptions.map((option) => {
        const isLogout = option.name === "Log Out";

        const Icon = iconMap[option.icon as keyof typeof iconMap];

        return (
          <NavLink
            to={option.path}
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
