import { useState, useEffect, useRef } from "react";
import type { User } from "../UsersPage/users.types";
import { useTheme } from "../../context/ThemeContext";
import { useAnimations } from "../../context/AnimationContext";
import { useMode } from "../../context/ModeContext";

type SettingsAppearanceProps = {
  user: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function SettingsAppearance({
  user,
  setCurrentUser,
}: SettingsAppearanceProps) {
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
      setPreviewTextColor(user.textColor);
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
      avatar: previewAvatar,
      banner: previewBanner,
    };
    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));

    savedRef.current = true;
    originalThemeRef.current = previewTheme;
    originalModeRef.current = previewMode;
    originalAnimationsRef.current = previewAnimations;
    originalColorRef.current = previewColor;
    originalAvatarRef.current = previewAvatar;
    originalBannerRef.current = previewBanner;

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setCurrentUser(updatedUser);
    setOriginalUser(structuredClone(updatedUser));
  }

  return (
    <div className="dashboard-card rounded-4xl compact:rounded-2xl p-6 compact:p-3">
      <div className="mb-6 compact:mb-3">
        <h2 className="dashboard-heading mb-2 compact:mb-1">Appearance</h2>
        <p className="dashboard-muted-text">
          Customize how your dashboard looks and feels.
        </p>
      </div>

      <div className="flex flex-col gap-8 compact:gap-4">
        <div className="flex flex-col">
          <p className="dashboard-section-label mb-3 compact:mb-1.5">
            Profile Picture
          </p>
          <div className="flex flex-col w-fit items-center gap-5">
            {previewAvatar ? (
              <img
                style={
                  {
                    backgroundColor: previewColor || "#22c55e",
                    color: user?.textColor || "#000000",
                    boxShadow: `0 0 20px ${previewColor}25`,
                    "--border-color-dark": `${previewColor}35`,
                    "--border-color-light": `${previewColor}`,
                  } as React.CSSProperties
                }
                src={previewAvatar}
                className="w-40 h-40 rounded-full object-cover border border-(--border-color-dark) light:border-(--border-color-light) transition-all duration-300"
              />
            ) : (
              <div className="w-40 h-40 rounded-full flex items-center justify-center text-5xl font-bold dashboard-stat-box">
                {user?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="dashboard-button-secondary cursor-pointer"
              >
                Edit Avatar
              </label>
              <button
                onClick={handleRemoveAvatar}
                className="dashboard-button-danger cursor-pointer"
              >
                Remove Avatar
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="dashboard-section-label mb-3 compact:mb-1.5">
            Profile Banner
          </p>
          <div
            style={
              {
                "--boxShadow": `0 0 20px ${previewColor}20`,
                "--boxShadow-light": `0 0 20px ${previewColor}75`,
              } as React.CSSProperties
            }
            className="w-full h-55 rounded-3xl compact:rounded-lg bg-linear-to-br from-slate-950 to-slate-800 relative overflow-hidden mb-5 compact:mb-2.5 shadow-(--boxShadow) light:shadow-(--boxShadow-light) transition-all duration-300"
          >
            {previewBanner ? (
              <>
                <img
                  src={previewBanner}
                  className="w-full h-full object-cover relative"
                />
                <div className="absolute inset-0 bg-black/85 light:bg-transparent transition-all duration-300"></div>
              </>
            ) : (
              <div className="dashboard-stat-box w-full h-55">
                <div className="absolute inset-0 bg-black/85 light:bg-transparent transition-all duration-300"></div>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="hidden"
              id="banner-upload"
            />
            <label
              htmlFor="banner-upload"
              className="dashboard-button-secondary cursor-pointer"
            >
              Edit Banner
            </label>
            <button
              onClick={handleRemoveBanner}
              className="dashboard-button-danger cursor-pointer"
            >
              Remove Banner
            </button>
          </div>
        </div>
        <div>
          <p className="dashboard-section-label mb-3 compact:mb-1.5">
            Accent Color
          </p>
          {!user && <div className="min-h-7"></div>}
          {user && (
            <div className="flex flex-wrap gap-3 compact:gap-1.5">
              {colors.map((buttonColor) => (
                <button
                  key={buttonColor}
                  onClick={() => handleUserColorChange(buttonColor)}
                  style={{ "--bg": buttonColor } as React.CSSProperties}
                  className={`dashboard-color-picker bg-(--bg)
                    ${
                      previewColor === buttonColor
                        ? buttonColor === "#ffffff"
                          ? `scale-105 border-white dark:shadow-[inset_0_0_0_2px_rgb(0,0,0)] light:border-black light:shadow-[inset_0_0_0_1px_rgb(0,0,0)]`
                          : buttonColor === "#000000"
                            ? `scale-105 border-white light:border-black light:shadow-[inset_0_0_0_2px_rgb(255,255,255)] dark:shadow-[inset_0_0_0_1px_rgb(255,255,255)]`
                            : `scale-110 border-white light:border-black light:shadow-[inset_0_0_0_1px_rgb(0,0,0)] dark:shadow-[inset_0_0_0_1px_rgb(255,255,255)]`
                        : buttonColor === "#ffffff"
                          ? `border-transparent light:border-black light:scale-105 hover:scale-105`
                          : buttonColor === "#000000"
                            ? `dark:border-white light:border-black scale-105 hover:scale-110`
                            : `border-transparent hover:scale-105`
                    }`}
                ></button>
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="dashboard-section-label mb-3 compact:mb-1.5">Theme</p>
          <div className="flex gap-3 compact:gap-1.5">
            <button
              onClick={() => handleThemePreview("dark")}
              style={
                {
                  "--border-light": `${previewColor}`,
                  "--border-dark": `${previewColor}55`,
                  "--boxShadow": `0 0 20px ${previewColor}25`,
                } as React.CSSProperties
              }
              className={`dashboard-option-card
                ${
                  previewTheme === "dark"
                    ? "shadow-(--boxShadow) border-(--border-dark) bg-slate-800 hover:bg-slate-700 light:border-(--border-light) light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
            >
              <div className="flex justify-between items-start">
                <div className="text-lg font-semibold">Dark</div>
              </div>
              <div className="flex gap-2 compact:gap-1">
                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
              </div>
            </button>
            <button
              onClick={() => handleThemePreview("light")}
              style={
                {
                  "--border-light": `${previewColor}`,
                  "--border-dark": `${previewColor}75`,
                  "--boxShadow-light": `0 0 20px${previewColor}50`,
                } as React.CSSProperties
              }
              className={`dashboard-option-card
                ${
                  previewTheme === "light"
                    ? previewColor !== "#ffffff"
                      ? "light:shadow-(--boxShadow-light) border-(--border-dark) bg-slate-800 hover:bg-slate-700 light:border-(--border-light) light:bg-slate-200 light:hover:bg-slate-300"
                      : "light:shadow-[0px_0px_20px_#00000025] light:border-black/25 bg-slate-800 hover:bg-slate-700 light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
            >
              <div className="flex justify-between items-start">
                <div className="text-lg font-semibold">Light</div>
              </div>
              <div className="flex gap-2 compact:gap-1">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-600 light:border-slate-400"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-200 border border-slate-600 light:border-slate-400"></div>
                <div className="w-8 h-8 rounded-lg bg-slate-300 border border-slate-600 light:border-slate-400"></div>
              </div>
            </button>
          </div>
        </div>
        <div>
          <p className="dashboard-section-label mb-2 compact:mb-1">
            UI Density
          </p>
          <div className="flex gap-3 compact:gap-1.5">
            <button
              style={
                {
                  "--bg-dark":
                    previewMode === "comfortable" ? "#1d293d" : "#020618",
                  "--bg-light":
                    previewMode === "comfortable" ? "#e2e8f0" : "f1f5f9",
                  "--text-dark":
                    previewMode === "comfortable" ? "#ffffff" : "#ffffff50",
                  "--text-light":
                    previewMode === "comfortable" ? "#000000" : "#00000075",
                  "--border-dark":
                    previewMode === "comfortable" ? "#45556c" : "#45556c50",
                  "--border-light":
                    previewMode === "comfortable" ? "#d1d5db" : "#d1d5db",
                } as React.CSSProperties
              }
              onClick={() => handleModePreview("comfortable")}
              className="
              dashboard-density-button
              text-(--text-dark)
              light:text-(--text-light)
              border-(--border-dark)
              bg-(--bg-dark)
              hover:bg-slate-700
              light:border-(--border-light)
              light:bg-(--bg-light)
              light:hover:bg-slate-100
            "
            >
              Comfortable
            </button>
            <button
              style={
                {
                  "--bg-dark":
                    previewMode === "compact" ? "#1d293d" : "#020618",
                  "--bg-light":
                    previewMode === "compact" ? "#e2e8f0" : "f1f5f9",
                  "--text-dark":
                    previewMode === "compact" ? "#ffffff" : "#ffffff50",
                  "--text-light":
                    previewMode === "compact" ? "#000000" : "#00000075",
                  "--border-dark":
                    previewMode === "compact" ? "#45556c" : "#45556c50",
                  "--border-light":
                    previewMode === "compact" ? "#d1d5db" : "#d1d5db",
                } as React.CSSProperties
              }
              onClick={() => handleModePreview("compact")}
              className="
              dashboard-density-button
              text-(--text-dark)
              light:text-(--text-light)
              border-(--border-dark)
              bg-(--bg-dark)
              hover:bg-slate-700
              light:border-(--border-light)
              light:bg-(--bg-light)
              light:hover:bg-slate-100
            "
            >
              Compact
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-end gap-5">
            <div>
              <h3 className="dashboard-section-title mb-0.5 compact:mb-0">
                Animations
              </h3>
              <p className="dashboard-section-label">
                Enable smooth transitions and effects.
              </p>
            </div>
            <button
              onClick={handleAnimationsPreview}
              className={`
              relative
              w-14
              h-8
              rounded-full
              cursor-pointer
              ${canAnimate ? "bg-lime-500" : "bg-gray-400"}
            `}
            >
              <div
                className={`
                absolute
                top-1
                right-1
                w-6
                h-6
                rounded-full
                bg-white
                transition-all
                duration-300
                ${canAnimate ? "translate-x-0" : "-translate-x-6"}
              `}
              ></div>
            </button>
          </div>
        </div>
        <button
          onClick={handleSaveAppearance}
          className={`dashboard-button-success w-fit 
            ${!hasChanges ? "opacity-50 cursor-not-allowed hover:bg-green-800" : "hover:bg-green-600"}`}
          disabled={!hasChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
