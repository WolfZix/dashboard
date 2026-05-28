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
    <aside className="w-64 compact:w-55 light:bg-[white] bg-slate-900 border-r light:border-[#e2e8f0] border-slate-800 flex flex-col justify-between transition-all duration-300">
      <div>
        <div className="h-16 flex items-center px-6 compact:px-3 border-b border-slate-800 light:border-[#e2e8f0] transition-all duration-300">
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
                  `
                flex items-center gap-3 px-4 py-3 rounded-xl compact:gap-1.5 compact:px-2 compact:py-1 compact:rounded-lg transition-all duration-300 group
                  ${
                    isActive
                      ? "bg-slate-700 text-white light:bg-[#f1f5f9] light:text-slate-950"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white light:text-slate-500 light:hover:bg-slate-200 light:hover:text-[#0f172a]"
                  }
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
      <div className="p-4 compact:p-2 border-t border-slate-800 light:border-slate-300 transition-all duration-300">
        <NavLink
          to={"settings"}
          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl compact:gap-1.5 compact:px-2 compact:py-1.5 compact:rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white light:text-slate-500 light:hover:bg-slate-200 light:hover:text-slate-600 transition-all duration-300"
        >
          <Settings size={20} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
