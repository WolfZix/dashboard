import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useMode } from "../context/ModeContext";
import { useAnimations } from "../context/AnimationContext";

export default function useDevShortcuts() {
  const { toggleTheme } = useTheme();
  const { mode, setMode } = useMode();
  const { toggleAnimations } = useAnimations();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "v") toggleTheme();
      if (e.ctrlKey && e.key === "b")
        setMode(mode === "comfortable" ? "compact" : "comfortable");
      if (e.ctrlKey && e.key === "c") toggleAnimations();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTheme, setMode, mode]);
}
