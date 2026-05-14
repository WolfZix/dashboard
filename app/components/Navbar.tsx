import NotificationsButton from "./navbar/NotificationsButton/NotificationsButton";
import OnlineStatus from "./navbar/OnlineStatus";
import ThemeToggle from "./navbar/ThemeToggle";
import UserProfile from "./navbar/ProfileButton/UserProfile";
import OverviewMessage from "./OverviewPage/OverviewMessage";
import UsersMessage from "./UsersPage/UsersMessage";
import AnalyticsMessage from "./AnalyticsPage/AnalyticsMessage";
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
        light:bg-[rgba(255,255,255,0.7)]
        light:border-[#e2e8f0]
        light:text-[#0f172a]
      "
    >
      <div>
        {location.pathname === "/" && <OverviewMessage />}
        {location.pathname === "/users" && <UsersMessage />}
        {location.pathname === "/analytics" && <AnalyticsMessage />}
      </div>

      <div className="flex items-center gap-4">
        <OnlineStatus />
        <ThemeToggle />
        <NotificationsButton />
        <UserProfile />
      </div>
    </header>
  );
}
