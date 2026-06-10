import NotificationsButton from "./NotificationsButton/NotificationsButton";
import OnlineStatus from "./OnlineStatus";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./ProfileButton/UserProfile";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <header
      className="
        px-6
        py-4
        compact:py-2
        compact:px-3
        h-16
        border-b border-slate-800
        bg-slate-900
        flex items-center justify-end
        light:bg-[rgba(255,255,255,0.7)]
        light:border-[#e2e8f0]
        light:text-[#0f172a]
        transition-all
        duration-300
      "
    >
      <div className="flex items-center gap-4 compact:gap-2">
        <OnlineStatus />
        <ThemeToggle />
        <NotificationsButton />
        <UserProfile />
      </div>
    </header>
  );
}
