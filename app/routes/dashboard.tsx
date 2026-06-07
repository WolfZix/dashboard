import { BarChart3, LayoutDashboard, Users } from "lucide-react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const links = [
    {
      name: "Overview",
      path: "/",
      shortcut: "Alt+1",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/users",
      shortcut: "Alt+2",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/analytics",
      shortcut: "Alt+3",
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-white light:bg-slate-100 light:text-[#0f172a] transition-all duration-300">
      <Sidebar links={links} />
      <main className="flex-1">
        <Navbar />
        <div className="flex-1 p-6 compact:p-3">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
