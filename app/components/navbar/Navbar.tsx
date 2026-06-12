import NotificationsButton from "./NotificationsButton/NotificationsButton";
import OnlineStatus from "./OnlineStatus";
import ThemeToggle from "./ThemeToggle";
import UserProfile from "./ProfileButton/UserProfile";
import { MenuIcon } from "lucide-react";
import type { SetStateAction } from "react";

type NavbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ setIsSidebarOpen, isSidebarOpen }: NavbarProps) {
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
      <div className="flex items-center justify-between lg:justify-end w-full gap-4 compact:gap-2">
        <div className={`${isSidebarOpen ? "opacity-0" : "opacity-100"} flex justify-start w-full lg:hidden`}>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon size={24}/>
        </button>
        </div>
        <OnlineStatus />
        <ThemeToggle />
        <NotificationsButton />
        <UserProfile />
      </div>
    </header>
  );
}
