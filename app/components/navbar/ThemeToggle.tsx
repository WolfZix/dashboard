import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const [hovered, setHovered] = useState(false);
  const { isLightMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
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
        !isLightMode ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )
      ) : !isLightMode ? (
        <Moon size={20} />
      ) : (
        <Sun size={20} />
      )}
    </button>
  );
}
