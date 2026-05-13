import SearchBar from "./navbar/SearchBar";
import NotificationsButton from "./navbar/NotificationsButton";
import OnlineStatus from "./navbar/OnlineStatus";
import ThemeToggle from "./navbar/ThemeToggle";
import UserProfile from "./navbar/UserProfile";
import OverviewMessage from "./OverviewMessage";
import UsersMessage from "./UsersMessage";
import AnalyticsMessage from "./AnalyticsMessage";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <header
      className="
        px-6
        py-4
        border-b border-slate-800
        bg-slate-900
        flex items-center justify-between
      "
    >
      <motion.div className="w-full">
        {location.pathname === "/" && <OverviewMessage />}
        {location.pathname === "/users" && <UsersMessage />}
        {location.pathname === "/analytics" && <AnalyticsMessage />}
      </motion.div>

      <div className="flex items-center gap-4">
        <SearchBar />

        <OnlineStatus />

        <ThemeToggle />

        <NotificationsButton />

        <UserProfile />
      </div>
    </header>
  );
}
