import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import { useMode } from "./context/ModeContext";
import { useAnimations } from "./context/AnimationContext";
import { useNavigate } from "react-router-dom";

export default function useDevShortcuts() {
  const { toggleTheme } = useTheme();
  const { mode, setMode } = useMode();
  const { toggleAnimations } = useAnimations();
  const navigate = useNavigate();
  const currentUsername = localStorage.getItem("username");

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (location.pathname === `/login`) {
        if (e.altKey && e.key === "t") toggleTheme();
        return;
      }
      if (e.altKey && e.key === "t") toggleTheme();
      if (e.altKey && e.key === "m")
        setMode(mode === "comfortable" ? "compact" : "comfortable");
      if (e.altKey && e.key === "a") toggleAnimations();
      if (e.altKey && e.key === "s") navigate("/settings");
      if (e.altKey && e.key === "p") navigate(`/profile/${currentUsername}`);
      if (e.altKey && e.key === "1") navigate("/");
      if (e.altKey && e.key === "2") navigate("/users");
      if (e.altKey && e.key === "3") navigate("/analytics");
      if (e.altKey && e.key === "l") {
        navigate("login");
        localStorage.removeItem("username");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    location.pathname,
    toggleTheme,
    setMode,
    mode,
    toggleAnimations,
    navigate,
  ]);
}
