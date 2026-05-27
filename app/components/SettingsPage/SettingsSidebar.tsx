import { useEffect, useState } from "react";
import type { User } from "../UsersPage/users.types";

type SidebarOptions = {
  name: string;
  icon: React.ElementType;
};

type SettingsSidebarProps = {
  options: SidebarOptions[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function SettingsSidebar({
  options,
  activeTab,
  setActiveTab,
}: SettingsSidebarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [color, setColor] = useState(user?.color || "#00FF00");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (!storedUsername) return;

    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) return;

    const users: User[] = JSON.parse(savedUsers);
    const foundUser = users.find(
      (user) => user.name.toLowerCase() === storedUsername.toLowerCase(),
    );

    if (foundUser) {
      setUser(foundUser);
      setColor(foundUser.color);
    }
  }, []);

  useEffect(() => {
    function syncColor(event: Event) {
      const customEvent = event as CustomEvent;
      setColor(customEvent.detail);
    }
    window.addEventListener("userColorChanged", syncColor);
    return () => {
      window.removeEventListener("userColorChanged", syncColor);
    };
  }, []);

  return (
    <div className="w-72 h-fit rounded-4xl pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold px-3">Settings</h1>
      </div>

      <div className="flex flex-col">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.name}
              onClick={() => setActiveTab(option.name)}
              className={`relative flex items-center gap-3 px-3 py-1.5 w-full rounded-md hover:bg-slate-800 text-white light:text-slate-900 light:hover:bg-slate-200 text-sm transition-all duration-300 cursor-pointer
            ${
              activeTab === option.name
                ? `bg-slate-800 light:bg-slate-200 pl-4`
                : ""
            }`}
            >
              <Icon size={15} />
              <span>{option.name}</span>
              {activeTab === option.name && (
                <div
                  style={{
                    backgroundColor: color || "#00FF00",
                  }}
                  className={`absolute -left-1.5 rounded-4xl w-0.75 h-6`}
                ></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
