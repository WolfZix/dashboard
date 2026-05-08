import { Outlet, Link, useLocation } from "react-router";

export default function DashboardLayout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 bg-slate-900 border-r border-slate-700 p-4">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>

        <nav className="space-y-2 text-sm">
          <Link
            to="/dashboard"
            className={`block px-3 py-2 rounded-lg ${
              isActive("/dashboard")
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Overview
          </Link>

          <Link
            to="/dashboard/users"
            className={`block px-3 py-2 rounded-lg ${
              isActive("/dashboard/users")
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Users
          </Link>

          <Link
            to="/dashboard/analytics"
            className={`block px-3 py-2 rounded-lg ${
              isActive("/dashboard/analytics")
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Analytics
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
