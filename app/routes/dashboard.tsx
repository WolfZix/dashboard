import { BarChart3, LayoutDashboard, Users } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useUser } from "../context/UserContext";

export default function DashboardLayout() {
  const { currentUser } = useUser();
  const links = [
    {
      name: "Overview",
      path: "/",
      shortcut: "Alt+1",
      icon: LayoutDashboard,
      allowedRoles: ["Admin", "Moderator", "Premium", "User", "Guest"],
    },
    {
      name: "Users",
      path: "/users",
      shortcut: "Alt+2",
      icon: Users,
      allowedRoles: ["Admin", "Moderator", "Premium", "User", "Guest"],
    },
    {
      name: "Analytics",
      path: "/analytics",
      shortcut: "Alt+3",
      icon: BarChart3,
      allowedRoles: ["Admin", "Moderator", "Premium"],
    },
  ];

  const visibleLinks = links.filter((link) =>
    link.allowedRoles.includes(currentUser?.role ?? ""),
  );

  return (
    <div className="min-h-screen flex bg-slate-950 text-white light:bg-slate-100 light:text-[#0f172a] transition-all duration-300">
      <Sidebar links={visibleLinks} />
      <main className="flex-1">
        <Navbar />
        <div className="flex-1 p-6 compact:p-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
