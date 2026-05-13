import { BarChart3, LayoutDashboard, Users } from "lucide-react";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

import HomeLoading from "../components/HomeLoading";
import UsersLoading from "../components/UsersLoading";
import AnalyticsLoading from "../components/AnalyticsLoading";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const links = [
    {
      name: "Overview",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  function LoadComponent() {
    if (location.pathname === "/") return <HomeLoading />;
    if (location.pathname === "/users") return <UsersLoading />;
    if (location.pathname === "/analytics") return <AnalyticsLoading />;
    return <HomeLoading />;
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <Sidebar links={links} />

      <main className="flex-1">
        <Navbar />
        <div className="flex-1 p-6">
          {loading ? <LoadComponent /> : <Outlet />}
        </div>
      </main>
    </div>
  );
}
