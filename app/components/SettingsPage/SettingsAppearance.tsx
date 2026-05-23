import { useState, useEffect } from "react";
import type { User } from "../UsersPage/users.types";

export default function SettingsAppearance() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [color, setColor] = useState("");
  const colors = [
    "#fb2c36", // red
    "#ff6900", // orange
    "#f0b100", // amber
    "#22c55e", // green
    "#00b8db", // cyan
    "#2b7fff", // blue
    "#ad46ff", // purple
    "#f6339a", // pink
    "#000000", // black
    "#ffffff", // white
    "#62748e", // slate
  ];

  useEffect(() => {
    if (user?.color) {
      setColor(user.color);
    }
  }, [user]);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "dark");
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

  useEffect(() => {
    function syncTheme() {
      setTheme(localStorage.getItem("theme") || "dark");
    }
    window.addEventListener("themeChanged", syncTheme);
    return () => {
      window.removeEventListener("themeChanged", syncTheme);
    };
  }, []);

  function toggleTheme(newTheme: string) {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
    window.dispatchEvent(new Event("themeChanged"));
  }

  return (
    <div className="rounded-4xl border border-slate-800 bg-slate-900 light:border-slate-300 light:bg-white p-6 transition-all duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Appearance</h2>
        <p className="text-slate-400 light:text-slate-600 transition-all duration-300">
          Customize how your dashboard looks and feels.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600 mb-3 transition-all duration-300">
            Theme
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => toggleTheme("dark")}
              className={`
                flex-1
                h-28
                rounded-3xl
                border
                transition-all
                duration-300
                cursor-pointer
                p-4
                flex
                flex-col
                justify-between
                ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-800 hover:bg-slate-700 light:border-slate-400 light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
            >
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
            <button
              onClick={() => toggleTheme("light")}
              className={`
                flex-1
                h-28
                rounded-3xl
                border
                transition-all
                duration-300
                cursor-pointer
                p-4
                flex
                flex-col
                justify-between
                ${
                  theme === "light"
                    ? "border-slate-700 bg-slate-800 hover:bg-slate-700 light:border-slate-400 light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
            >
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
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-400 light:text-slate-600 mb-3 transition-all duration-300">
            Accent Color
          </p>
          {!user && <div className="min-h-7"></div>}
          {user && (
            <div className="flex flex-wrap gap-3">
              {colors.map((buttonColor) => (
                <button
                  key={buttonColor}
                  onClick={() => setColor(buttonColor)}
                  style={{ "--bg": buttonColor } as React.CSSProperties}
                  className={`w-7 h-7 rounded-full bg-(--bg) border transition-all duration-300 cursor-pointer
                    ${
                      color === buttonColor
                        ? buttonColor === "#ffffff"
                          ? `scale-105 border-white light:border-black dark:shadow-[inset_0_0_0_2px_rgb(0,0,0)] light:shadow-none`
                          : buttonColor === "#000000"
                            ? `scale-105 border-white light:border-black light:shadow-[inset_0_0_0_2px_rgb(255,255,255)]`
                            : `scale-105 border-white light:border-black`
                        : buttonColor === "#ffffff"
                          ? `border-transparent light:border-black light:scale-105`
                          : buttonColor === "#000000"
                            ? `dark:border-white light:border-black scale-105`
                            : `border-transparent`
                    } hover:scale-110`}
                ></button>
              ))}
            </div>
          )}
        </div>
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
  );
}
