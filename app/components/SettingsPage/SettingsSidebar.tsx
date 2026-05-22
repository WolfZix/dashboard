import { Bell, Brush, LucideUnlock, UserRound } from "lucide-react";

export default function SettingsSidebar() {
  const options = [
    {
      name: "Appearance",
      icon: Brush,
    },
    {
      name: "Account",
      icon: UserRound,
    },
    {
      name: "Privacy",
      icon: LucideUnlock,
    },
    {
      name: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="w-72 h-fit rounded-4xl pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold px-3">Settings</h1>
      </div>

      <div className="flex flex-col">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button className="flex items-center gap-3 px-3 py-3 w-full rounded-lg bg-transparent hover:bg-slate-800 text-white text-sm transition cursor-pointer">
              <Icon size={15} />
              <span>{option.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
