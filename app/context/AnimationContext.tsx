import { createContext, useContext, useEffect, useState } from "react";

type AnimationContextType = {
  canAnimate: boolean;
  setAnimations: (enabled: boolean) => void;
  toggleAnimations: () => void;
};

const AnimationContext = createContext<AnimationContextType | null>(null);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [canAnimate, setCanAnimate] = useState(
    localStorage.getItem("animations") !== "false",
  );
  useEffect(() => {
    localStorage.setItem("animations", String(canAnimate));

    if (canAnimate) {
      document.documentElement.classList.remove("noAnimations");
    } else {
      document.documentElement.classList.add("noAnimations");
    }
  }, [canAnimate]);

  function toggleAnimations() {
    setCanAnimate((prev) => !prev);
  }

  function setAnimations(enabled: boolean) {
    setCanAnimate(enabled);
  }

  return (
    <AnimationContext.Provider
      value={{
        canAnimate,
        toggleAnimations,
        setAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimations must be used inside AnimationProvider");
  }
  return context;
}
