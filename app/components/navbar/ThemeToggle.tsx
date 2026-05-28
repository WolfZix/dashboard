import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [hovered, setHovered] = useState(false);
  const [darkMode, setDarkModee] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    window.dispatchEvent(new Event("themeChanged"));
  }, [darkMode]);

  useEffect(() => {
    function syncTheme() {
      setDarkModee(localStorage.getItem("theme") !== "light");
    }
    window.addEventListener("themeChanged", syncTheme);
    return () => {
      window.removeEventListener("themeChanged", syncTheme);
    };
  }, []);

  function changeMode() {
    setDarkModee((prev) => !prev);
  }

  return (
    <button
      onClick={changeMode}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        p-2.5
        compact:p-1.5
        rounded-xl
        compact:rounded-lg
        border
        transition-all
        duration-300
        cursor-pointer
        bg-slate-800
        border-slate-700
        hover:border-slate-600
        hover:bg-white
        hover:text-black
        light:bg-[white]
        light:border-[#e2e8f0]
        light:hover:bg-slate-800
        light:hover:text-[white]
      "
    >
      {hovered ? (
        darkMode ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )
      ) : darkMode ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}
