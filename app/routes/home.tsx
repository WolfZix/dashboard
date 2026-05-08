import StatCard from "../components/stat-card";

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard overview 🚀</h1>
        <p className="text-slate-400 mt-1">
          Welcome back, here’s what’s happening.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Revenue" value="value" change="change" />
        <StatCard title="Users" value="value" change="change" />
        <StatCard title="Orders" value="value" change="change" />
        <StatCard title="Conversion" value="value" change="change" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-slate-900 border border-slate-700 rounded-2xl p-5 h-80">
          <h2 className="font-semibold mb-2">Traffic overview</h2>
          <p className="text-slate-400 text-sm">Wykres</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
          <h2 className="font-semibold mb-2">Recent activity</h2>

          <ul className="text-sm text-slate-400 space-y-2">
            <li>New user registered</li>
            <li>Order completed</li>
            <li>Payment received</li>
            <li>System backup done</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
