import { createContext, useContext, useEffect, useState } from "react";

type ModeContextType = {
  mode: "comfortable" | "compact";
  setMode: (mode: "comfortable" | "compact") => void;
};

const ModeContext = createContext<ModeContextType | null>(null);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<"comfortable" | "compact">(
    localStorage.getItem("mode") === "compact" ? "compact" : "comfortable",
  );
  useEffect(() => {
    localStorage.setItem("mode", mode);

    if (mode === "compact") {
      document.documentElement.classList.add("compact");
    } else {
      document.documentElement.classList.remove("compact");
    }
  }, [mode]);

  return (
    <ModeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error("useMode must be used inside ModeProvider");
  }
  return context;
}
