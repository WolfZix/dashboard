import { Link, Outlet } from "react-router";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      <aside className="w-64 bg-slate-900 border-r border-slate-700 p-4">
        <h1 className="text-xl font-bold mb-6">Dashboard</h1>

        <nav className="space-y-2 text-slate-300">
          <Link to="/dashboard" className="block hover:text-white">
            Overview
          </Link>

          <Link to="/dashboard/users" className="block hover:text-white">
            Users
          </Link>

          <Link to="/dashboard/analytics" className="block hover:text-white">
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
