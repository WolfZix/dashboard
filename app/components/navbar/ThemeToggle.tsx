import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkModee] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  const [hovered, setHovered] = useState(false);

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
        rounded-xl
        border
        transition-all
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
