import { Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type SidebarProps = {
  links: {
    name: string;
    path: string;
    icon: LucideIcon;
  }[];
};

export default function Sidebar({ links }: SidebarProps) {
  return (
    <aside className="w-64 compact:w-55 light:bg-[white] bg-slate-900 border-r dashboard-sidebar-border flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="h-16 flex items-center px-6 compact:px-3 border-b dashboard-sidebar-border transition-all duration-300">
          <h1 className="text-xl font-bold tracking-tight light:text-slate-950 transition-all duration-300">
            Dashboard
          </h1>
        </div>
        <nav className="p-4 space-y-1 compact:p-2">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `dashboard-sidebar-link ${isActive ? "dashboard-sidebar-link-active" : "dashboard-sidebar-link-inactive"}`
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="p-4 compact:p-2 border-t dashboard-sidebar-border transition-all duration-300">
        <NavLink
          to={"settings"}
          className="dashboard-sidebar-link w-full dashboard-sidebar-link-inactive"
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
