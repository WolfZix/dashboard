import { useEffect, useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import type { User } from "../UsersPage/users.types";

export default function SettingsPage() {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const userName = user?.name;
  const userLetter = user?.name[0];
  const userRole = user?.role;
  const userProfilePicture = user?.avatar;

  useEffect(() => {
    function loadCurrentUser() {
      const storedUsername = localStorage.getItem("username");
      if (!storedUsername) return;

      const savedUsers = localStorage.getItem("users");
      if (!savedUsers) return;

      const users: User[] = JSON.parse(savedUsers);
      const foundUser = users.find(
        (user) => user.name.toLowerCase() === storedUsername.toLowerCase(),
      );
      if (foundUser) setUser(foundUser);
    }
    loadCurrentUser();
    window.addEventListener("usersUpdated", loadCurrentUser);
    return () => {
      window.removeEventListener("usersUpdated", loadCurrentUser);
    };
  }, []);
  return (
    <div className="flex gap-6 h-full">
      <SettingsSidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Appearance */}
        <div className="rounded-4xl border border-slate-800 bg-slate-900 light:border-slate-300 light:bg-white p-6 transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Appearance</h2>

            <p className="text-slate-400 light:text-slate-600 transition-all duration-300">
              Customize how your dashboard looks and feels.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Theme */}
            <div>
              <p className="text-sm text-slate-400 light:text-slate-600 mb-3 transition-all duration-300">
                Theme
              </p>

              <div className="flex gap-3">
                <button className="flex-1 h-28 rounded-3xl border border-slate-700 bg-slate-800 hover:bg-slate-700 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200 transition-all duration-300 cursor-pointer p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-semibold">Dark</div>
                    <div className="w-3 h-3 rounded-full bg-transparent border border-slate-400 transition-all duration-300"></div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                  </div>
                </button>

                <button className="flex-1 h-28 rounded-3xl border border-slate-800 bg-slate-950 hover:bg-slate-900 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200 transition-all duration-300 cursor-pointer p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-semibold">Light</div>
                    <div className="w-3 h-3 rounded-full bg-transparent border border-slate-400 transition-all duration-300"></div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-600 light:border-slate-400 transition-all duration-300"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-200 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-300 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                  </div>
                </button>

                <button className="flex-1 h-28 rounded-3xl border border-slate-800 bg-slate-950 hover:bg-slate-900 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200 transition-all duration-300 cursor-pointer p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-semibold">System</div>
                    <div className="w-3 h-3 rounded-full bg-transparent border border-slate-400 transition-all duration-300"></div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-400 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>

                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <p className="text-sm text-slate-400 light:text-slate-600 mb-3 transition-all duration-300">
                Accent Color
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="w-9 h-9 rounded-full bg-red-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-orange-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-yellow-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-lime-500 border-2 border-white light:border-slate-900 scale-110 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-cyan-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-blue-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-purple-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-pink-500 border-2 border-transparent hover:scale-105 transition-all duration-300 cursor-pointer"></button>
              </div>
            </div>

            {/* UI Density */}
            <div>
              <p className="text-sm text-slate-400 light:text-slate-600 mb-3 transition-all duration-300">
                UI Density
              </p>

              <div className="flex gap-3">
                <button className="flex-1 py-4 rounded-2xl border border-slate-600 bg-slate-800 hover:bg-slate-700 light:border-slate-300 light:bg-slate-200 light:hover:bg-slate-100 font-semibold transition-all duration-300 cursor-pointer">
                  Comfortable
                </button>

                <button className="flex-1 py-4 rounded-2xl border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-600 light:hover:text-slate-950 transition-all duration-300 cursor-pointer">
                  Compact
                </button>
              </div>
            </div>

            {/* Animations */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg light:text-slate-700 font-semibold mb-1 transition-all duration-300">
                    Animations
                  </h3>

                  <p className="text-sm text-slate-400 light:text-slate-600 transition-all duration-300">
                    Enable smooth transitions and effects.
                  </p>
                </div>

                <button className="relative w-14 h-8 rounded-full bg-lime-500 transition-all duration-300 cursor-pointer">
                  <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
