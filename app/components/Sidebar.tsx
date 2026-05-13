import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  links: {
    name: string;
    path: string;
    icon: any;
  }[];
};

export default function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between">
      <div>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <nav className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}
                `
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-white transition-all">
          <Settings size={20} />
          Settings
        </button>
      </div>
    </aside>
  );
}
