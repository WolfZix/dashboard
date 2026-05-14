import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getDasboardData } from "../../../services/dashboard.server";

type DashboardData = {
  profileOptions: {
    name: string;
  }[];
};

export default function ProfileDropdown() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDasboardData();
      setData(result);
    }
    loadData();
  }, []);

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
        duration: 0.2,
      }}
      className="
    flex flex-col gap-2 
    absolute 
    top-full
    w-full
    right-0 
    min-h-10 
    bg-slate-800
    border border-slate-700
    border-t-0
    light:bg-[white]
    light:border-[#e2e8f0]
    rounded-xl
    rounded-t-none
    text-right
    z-10
    px-1
    "
    >
      {data?.profileOptions.map((option) => {
        const isLogout = option.name === "Log Out";
        return (
          <div
            key={option.name}
            className={`
                text-sm
                rounded-2xl
                py-2
                pr-3
                cursor-pointer
                hover:bg-slate-700
                light:hover:bg-slate-200
                transition-colors
                ${
                  isLogout
                    ? "text-red-300 hover:text-red-500"
                    : "text-slate-400 hover:text-white light:text-slate-500 light:hover:text-[#0f172a]"
                }
                `}
          >
            {option.name}
          </div>
        );
      })}
    </motion.div>
  );
}
