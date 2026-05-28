import { useState, useEffect } from "react";
import type { User } from "../UsersPage/users.types";

export default function SettingsAppearance() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode");
  });
  const [previewColor, setPreviewColor] = useState(
    localStorage.getItem("color") || user?.color,
  );
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

  const [animationsEnabled, setAnimationsEnabled] = useState(() => {
    return localStorage.getItem("animations") !== "false";
  });

  useEffect(() => {
    if (user?.color) {
      setPreviewColor(user.color);
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

  useEffect(() => {
    const animations = localStorage.getItem("animations");
    if (animations === "false") {
      document.documentElement.classList.add("no-animations");
    }
  });

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

  function handleUserColorChange(color: string) {
    setPreviewColor(color);
    window.dispatchEvent(
      new CustomEvent("userColorChanged", {
        detail: color,
      }),
    );
  }

  function toggleMode(density: string) {
    localStorage.setItem("mode", density);
    setMode(density);
    if (density === "comfortable") {
      document.documentElement.classList.remove("compact");
    } else {
      document.documentElement.classList.add("compact");
    }
    window.dispatchEvent(new Event("themeChanged"));
  }

  function toggleAnimations() {
    const newValue = !animationsEnabled;
    setAnimationsEnabled(newValue);
    localStorage.setItem("animations", newValue.toString());
    if (newValue) {
      document.documentElement.classList.remove("no-animations");
    } else {
      document.documentElement.classList.add("no-animations");
    }
  }

  return (
    <div className="rounded-4xl compact:rounded-2xl border border-slate-800 bg-slate-900 light:border-slate-300 light:bg-white p-6 compact:p-3 transition-all duration-300">
      <div className="mb-6 compact:mb-3">
        <h2 className="text-2xl font-bold mb-2 compact:mb-1">Appearance</h2>
        <p className="text-slate-400 light:text-slate-600 transition-all duration-300">
          Customize how your dashboard looks and feels.
        </p>
      </div>

      <div className="flex flex-col gap-8 compact:gap-4">
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600 mb-3 compact:mb-1.5 transition-all duration-300">
            Theme
          </p>
          <div className="flex gap-3 compact:gap-1.5">
            <button
              onClick={() => toggleTheme("dark")}
              style={
                {
                  "--border-light": `${previewColor}`,
                  "--border-dark": `${previewColor}55`,
                  "--boxShadow": `0 0 20px ${previewColor}25`,
                } as React.CSSProperties
              }
              className={`
                flex-1
                h-28
                compact:h-22
                rounded-3xl
                compact:rounded-2xl
                border
                transition-all
                duration-300
                cursor-pointer
                p-4
                compact:p-2
                flex
                flex-col
                justify-between
                ${
                  theme === "dark"
                    ? "shadow-(--boxShadow) border-(--border-dark) bg-slate-800 hover:bg-slate-700 light:border-(--border-light) light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
            >
              <div className="flex justify-between items-start">
                <div className="text-lg font-semibold">Dark</div>
                <div className="w-3 h-3 rounded-full bg-transparent border border-slate-400 transition-all duration-300"></div>
              </div>
              <div className="flex gap-2 compact:gap-1">
                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
              </div>
            </button>
            <button
              onClick={() => toggleTheme("light")}
              style={
                {
                  "--border-light": `${previewColor}`,
                  "--border-dark": `${previewColor}75`,
                  "--boxShadow-light": `0 0 20px${previewColor}50`,
                } as React.CSSProperties
              }
              className={`
                flex-1
                h-28
                compact:h-22
                rounded-3xl
                compact:rounded-2xl
                border
                transition-all
                duration-300
                cursor-pointer
                p-4
                compact:p-2
                flex
                flex-col
                justify-between
                ${
                  theme === "light"
                    ? previewColor !== "#ffffff"
                      ? "light:shadow-(--boxShadow-light) border-(--border-dark) bg-slate-800 hover:bg-slate-700 light:border-(--border-light) light:bg-slate-200 light:hover:bg-slate-300"
                      : "light:shadow-[0px_0px_20px_#00000025] light:border-black/25 bg-slate-800 hover:bg-slate-700 light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
            >
              <div className="flex justify-between items-start">
                <div className="text-lg font-semibold">Light</div>
                <div className="w-3 h-3 rounded-full bg-transparent border border-slate-400 transition-all duration-300"></div>
              </div>
              <div className="flex gap-2 compact:gap-1">
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
            <div className="flex flex-wrap gap-3 compact:gap-1.5">
              {colors.map((buttonColor) => (
                <button
                  key={buttonColor}
                  onClick={() => handleUserColorChange(buttonColor)}
                  style={{ "--bg": buttonColor } as React.CSSProperties}
                  className={`w-7 h-7 rounded-full bg-(--bg) border transition-all duration-300 cursor-pointer
                    ${
                      previewColor === buttonColor
                        ? buttonColor === "#ffffff"
                          ? `scale-105 border-white dark:shadow-[inset_0_0_0_2px_rgb(0,0,0)] light:border-black light:shadow-[inset_0_0_0_1px_rgb(0,0,0)]`
                          : buttonColor === "#000000"
                            ? `scale-105 border-white light:border-black light:shadow-[inset_0_0_0_2px_rgb(255,255,255)] dark:shadow-[inset_0_0_0_1px_rgb(255,255,255)]`
                            : `scale-110 border-white light:border-black light:shadow-[inset_0_0_0_1px_rgb(0,0,0)] dark:shadow-[inset_0_0_0_1px_rgb(255,255,255)]`
                        : buttonColor === "#ffffff"
                          ? `border-transparent light:border-black light:scale-105 hover:scale-105`
                          : buttonColor === "#000000"
                            ? `dark:border-white light:border-black scale-105 hover:scale-110`
                            : `border-transparent hover:scale-105`
                    }`}
                ></button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-slate-400 light:text-slate-600 mb-3 compact:mb-1.5 transition-all duration-300">
            UI Density
          </p>
          <div className="flex gap-3 compact:gap-1.5">
            <button
              style={
                {
                  "--bg-dark": mode === "comfortable" ? "#1d293d" : "#020618",
                  "--bg-light": mode === "comfortable" ? "#e2e8f0" : "f1f5f9",
                  "--text-dark":
                    mode === "comfortable" ? "#ffffff" : "#ffffff50",
                  "--text-light":
                    mode === "comfortable" ? "#000000" : "#00000075",
                  "--border-dark":
                    mode === "comfortable" ? "#45556c" : "#45556c50",
                  "--border-light":
                    mode === "comfortable" ? "#d1d5db" : "#d1d5db",
                } as React.CSSProperties
              }
              onClick={() => toggleMode("comfortable")}
              className="flex-1 py-4 compact:py-2 text-(--text-dark) light:text-(--text-light) rounded-2xl compact:rounded-xl border border-(--border-dark) bg-(--bg-dark) hover:bg-slate-700 light:border-(--border-light) light:bg-(--bg-light) light:hover:bg-slate-100 font-semibold transition-all duration-300 cursor-pointer"
            >
              Comfortable
            </button>
            <button
              style={
                {
                  "--bg-dark": mode === "compact" ? "#1d293d" : "#020618",
                  "--bg-light": mode === "compact" ? "#e2e8f0" : "f1f5f9",
                  "--text-dark": mode === "compact" ? "#ffffff" : "#ffffff50",
                  "--text-light": mode === "compact" ? "#000000" : "#00000075",
                  "--border-dark": mode === "compact" ? "#45556c" : "#45556c50",
                  "--border-light": mode === "compact" ? "#d1d5db" : "#d1d5db",
                } as React.CSSProperties
              }
              onClick={() => toggleMode("compact")}
              className="flex-1 py-4 compact:py-2 text-(--text-dark) light:text-(--text-light) rounded-2xl compact:rounded-xl border border-(--border-dark) bg-(--bg-dark) hover:bg-slate-700 light:border-(--border-light) light:bg-(--bg-light) light:hover:bg-slate-100 font-semibold transition-all duration-300 cursor-pointer"
            >
              Compact
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg light:text-slate-700 font-semibold mb-1 compact:mb-0.5 transition-all duration-300">
                Animations
              </h3>
              <p className="text-sm text-slate-400 light:text-slate-600 transition-all duration-300">
                Enable smooth transitions and effects.
              </p>
            </div>
            <button
              onClick={toggleAnimations}
              className={`relative w-14 h-8 rounded-full cursor-pointer
            ${animationsEnabled ? "bg-lime-500 transition-all duration-300" : "bg-gray-400"}`}
            >
              <div
                className={`absolute top-1 right-1 w-6 h-6 rounded-full bg-white
                ${animationsEnabled ? "translate-x-0 transition-all duration-300" : "-translate-x-6"}`}
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
