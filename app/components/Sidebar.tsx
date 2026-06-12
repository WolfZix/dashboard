import { MenuIcon, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import OverviewMessage from "./OverviewPage/OverviewMessage";
import UsersMessage from "./UsersPage/UsersMessage";
import AnalyticsMessage from "./AnalyticsPage/AnalyticsMessage";
import { useLocation } from "react-router-dom";
import type { SetStateAction } from "react";
import { motion} from "framer-motion";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  links: {
    name: string;
    path: string;
    shortcut: string;
    icon: LucideIcon;
  }[];
  userRole?: string;
};

export default function Sidebar({setIsOpen, isOpen, links, userRole }: SidebarProps) {
  const location = useLocation();
  const visibleLinks = links.filter((link) => {
    if (
      link.name === "Analytics" &&
      (userRole === "User" || userRole === "Guest")
    ) {
      return false;
    }
    return true;
  });
  return (
    <motion.aside
    initial={false}
    animate={{
      x: isOpen ? 0 : "-100%",
    }}
    transition={{
      duration: 0.2,
      ease: "easeInOut",
    }}
    className="
    w-64 compact:w-55
    light:bg-[white] bg-slate-900
    border-r
    dashboard-sidebar-border
    flex flex-col justify-between
    fixed
    top-0 bottom-0 left-0
    z-50
    lg:static
    lg:translate-x-0
  "
>
      <div>
        <div className="hidden lg:flex h-16 items-center px-6 compact:px-3 border-b dashboard-sidebar-border transition-all duration-300">
          <div>
            {location.pathname === "/" && <OverviewMessage />}
            {location.pathname === "/users" && <UsersMessage />}
            {location.pathname === "/analytics" && <AnalyticsMessage />}
          </div>
        </div>
          <div className="flex lg:hidden h-16 items-center px-6 compact:px-3 border-b dashboard-sidebar-border transition-all duration-300">
            <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon size={24}/>
        </button>
          </div>
        <nav className="p-4 space-y-1 compact:p-2">
          {visibleLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              >
                {({ isActive }) => (
                  <div
                    className={`dashboard-sidebar-link flex justify-between ${
                      isActive
                        ? "dashboard-sidebar-link-active"
                        : "dashboard-sidebar-link-inactive"
                    }`}
                  >
                    <p className="flex gap-2 compact:gap-1">
                      <Icon size={20} />
                      {link.name}
                    </p>

                    <p
                      className={isActive ? "text-slate-400" : "text-slate-600"}
                    >
                      {link.shortcut}
                    </p>
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="p-4 compact:p-2 border-t dashboard-sidebar-border transition-all duration-300">
        <NavLink
        to={"settings"}
        onClick={() => setIsOpen(false)}
        >
          {({ isActive }) => (
            <div
              className={`dashboard-sidebar-link flex justify-between ${
                isActive
                  ? "dashboard-sidebar-link-active"
                  : "dashboard-sidebar-link-inactive"
              }`}
            >
              <p className="flex gap-2 compact:gap-1">
                <Settings size={20} />
                Settings
              </p>

              <p className={isActive ? "text-slate-400" : "text-slate-600"}>
                Alt+S
              </p>
            </div>
          )}
        </NavLink>
      </div>
    </motion.aside>
  );
}
