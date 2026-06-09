import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import { useMode } from "./context/ModeContext";
import { useAnimations } from "./context/AnimationContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./context/UserContext";

export default function useDevShortcuts() {
  const { toggleTheme } = useTheme();
  const { mode, setMode } = useMode();
  const { toggleAnimations } = useAnimations();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUsername = localStorage.getItem("username");
  const { currentUser } = useUser();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (location.pathname.endsWith(`/login`)) {
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
      if (
        e.altKey &&
        e.key === "3" &&
        currentUser?.role !== "User" &&
        currentUser?.role !== "Guest"
      )
        navigate("/analytics");
      if (e.altKey && e.key === "l") {
        localStorage.removeItem("username");
        navigate("/login");
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
