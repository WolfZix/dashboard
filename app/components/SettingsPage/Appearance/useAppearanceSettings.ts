import { useEffect, useRef, useState } from "react";
import type { User } from "../../UsersPage/users.types";
import { useTheme } from "../../../context/ThemeContext";
import { useMode } from "../../../context/ModeContext";
import { useAnimations } from "../../../context/AnimationContext";

type UseAppearanceSettingsProps = {
  user: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const DEFAULT_APPEARANCE = {
  theme: "dark" as const,
  mode: "comfortable" as const,
  animations: true,
  color: "#22c55e",
  textColor: "#000000",
  avatar: "",
  banner: "",
};

export default function useAppearanceSettings({
  user,
  setCurrentUser,
}: UseAppearanceSettingsProps) {
  const savedRef = useRef(false);

  const { isLightMode, setTheme } = useTheme();
  const theme = isLightMode ? "light" : "dark";
  const { mode, setMode } = useMode();
  const { canAnimate, setAnimations } = useAnimations();

  const [originalUser, setOriginalUser] = useState<User | null>(null);

  const originalColorRef = useRef(user?.color || "#22c55e");
  const originalTextColorRef = useRef(user?.textColor || "#000000");
  const originalAvatarRef = useRef(user?.avatar || "");
  const originalBannerRef = useRef(user?.banner || "");
  const originalThemeRef = useRef(theme);
  const originalModeRef = useRef(mode);
  const originalAnimationsRef = useRef(canAnimate);

  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || "");
  const [previewBanner, setPreviewBanner] = useState(user?.banner || "");
  const [previewColor, setPreviewColor] = useState(user?.color || "#22c55e");
  const [previewTextColor, setPreviewTextColor] = useState(
    user?.textColor || "#000000",
  );
  const [previewTheme, setPreviewTheme] = useState(theme);
  const [previewMode, setPreviewMode] = useState(mode);
  const [previewAnimations, setPreviewAnimations] = useState(canAnimate);

  const hasChanges =
    previewAvatar !== originalUser?.avatar ||
    previewBanner !== originalUser?.banner ||
    previewColor !== originalUser?.color ||
    previewTextColor !== originalUser?.textColor ||
    previewTheme !== originalThemeRef.current ||
    previewMode !== originalModeRef.current ||
    previewAnimations !== originalAnimationsRef.current;

  const colors = [
    "#fb2c36",
    "#ff6900",
    "#f0b100",
    "#22c55e",
    "#00b8db",
    "#2b7fff",
    "#ad46ff",
    "#f6339a",
    "#000000",
    "#ffffff",
    "#62748e",
  ];

  useEffect(() => {
    savedRef.current = false;
    return () => {
      if (!savedRef.current) {
        setTheme(originalThemeRef.current as "light" | "dark");
        setMode(originalModeRef.current as "comfortable" | "compact");
        setAnimations(originalAnimationsRef.current);
        setCurrentUser((prev) =>
          prev
            ? {
                ...prev,
                color: originalColorRef.current,
                textColor: originalTextColorRef.current,
                avatar: originalAvatarRef.current,
                banner: originalBannerRef.current,
              }
            : null,
        );
      }
    };
  }, []);

  useEffect(() => {
    if (user && !originalUser) {
      originalColorRef.current = user.color;
      originalTextColorRef.current = user.textColor || "#000000";
      originalAvatarRef.current = user.avatar || "";
      originalBannerRef.current = user.banner || "";
      setOriginalUser(structuredClone(user));
      setPreviewColor(user.color);
      setPreviewTextColor(user.textColor || "#000000");
      setPreviewAvatar(user.avatar || "");
      setPreviewBanner(user.banner || "");
      setPreviewTheme(theme);
      setPreviewMode(mode);
      setPreviewAnimations(canAnimate);
    }
  }, [user, originalUser]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewAvatar(result);
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              avatar: result,
            }
          : null,
      );
    };
    reader.readAsDataURL(file);
  }
  function handleRemoveAvatar() {
    setPreviewAvatar("");
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            avatar: "",
          }
        : null,
    );
  }
  function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPreviewBanner(result);
      setCurrentUser((prev) =>
        prev
          ? {
              ...prev,
              banner: result,
            }
          : null,
      );
    };
    reader.readAsDataURL(file);
  }
  function handleRemoveBanner() {
    setPreviewBanner("");
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            banner: "",
          }
        : null,
    );
  }
  function handleUserColorChange(color: string) {
    setPreviewColor(color);
    const textColor = color === "#000000" ? "#FFFFFF" : "#000000";
    setPreviewTextColor(textColor);
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            color,
            textColor,
          }
        : null,
    );
  }
  function handleThemePreview(theme: "light" | "dark") {
    setPreviewTheme(theme);
    setTheme(theme);
  }
  function handleModePreview(mode: "comfortable" | "compact") {
    setPreviewMode(mode);
    setMode(mode);
  }
  function handleAnimationsPreview() {
    const newValue = !previewAnimations;
    setPreviewAnimations(newValue);
    setAnimations(newValue);
  }
  // SAVE CHANGES FUNCTION //
  function handleSaveAppearance() {
    if (!user) return;
    const savedUsers = localStorage.getItem("users");

    if (!savedUsers) return;
    const users: User[] = JSON.parse(savedUsers);
    const updatedUser = {
      ...user,
      color: previewColor,
      textColor: previewTextColor,
      avatar: previewAvatar,
      banner: previewBanner,
    };
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));

    savedRef.current = true;
    originalThemeRef.current = previewTheme;
    originalModeRef.current = previewMode;
    originalAnimationsRef.current = previewAnimations;
    originalColorRef.current = previewColor;
    originalTextColorRef.current = previewTextColor;
    originalAvatarRef.current = previewAvatar;
    originalBannerRef.current = previewBanner;

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(updatedUser);
    setOriginalUser(structuredClone(updatedUser));
  }
  // RESTORE TO DEFAULT OPTIONS FUNCTION //
  function handleRestoreDefaultOptions() {
    setPreviewTheme(DEFAULT_APPEARANCE.theme);
    setPreviewMode(DEFAULT_APPEARANCE.mode);
    setPreviewAnimations(DEFAULT_APPEARANCE.animations);
    setPreviewColor(DEFAULT_APPEARANCE.color);
    setPreviewTextColor(DEFAULT_APPEARANCE.textColor);
    setPreviewAvatar(DEFAULT_APPEARANCE.avatar);
    setPreviewBanner(DEFAULT_APPEARANCE.banner);

    setTheme(DEFAULT_APPEARANCE.theme);
    setMode(DEFAULT_APPEARANCE.mode);
    setAnimations(DEFAULT_APPEARANCE.animations);

    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            color: DEFAULT_APPEARANCE.color,
            textColor: DEFAULT_APPEARANCE.textColor,
            avatar: DEFAULT_APPEARANCE.avatar,
            banner: DEFAULT_APPEARANCE.banner,
          }
        : null,
    );
  }
  return {
    previewAvatar,
    previewBanner,
    previewColor,
    previewTextColor,
    previewTheme,
    previewMode,
    previewAnimations,

    hasChanges,
    colors,
    canAnimate,

    handleAvatarChange,
    handleRemoveAvatar,
    handleBannerChange,
    handleRemoveBanner,
    handleUserColorChange,
    handleThemePreview,
    handleModePreview,
    handleAnimationsPreview,

    handleSaveAppearance,
    handleRestoreDefaultOptions,
  };
}
