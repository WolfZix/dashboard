import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isLightMode: boolean;
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLightMode, setIsLightMode] = useState(
    localStorage.getItem("theme") === "light",
  );
  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  }, [isLightMode]);

  function toggleTheme() {
    setIsLightMode((prev) => !prev);
  }

  function setTheme(theme: "light" | "dark") {
    setIsLightMode(theme === "light");
  }

  return (
    <ThemeContext.Provider
      value={{
        isLightMode,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
