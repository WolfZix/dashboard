import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useMode } from "../context/ModeContext";

export default function useDevShortcuts() {
  const { toggleTheme } = useTheme();
  const { mode, setMode } = useMode();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.key === "t") {
        toggleTheme();
      }

      if (e.altKey && e.key === "m") {
        setMode(mode === "comfortable" ? "compact" : "comfortable");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTheme, setMode]);
}
