import type { User } from "../../UsersPage/users.types";
import ProfilePictureSection from "./ProfilePictureSection";
import ProfileBannerSection from "./ProfileBannerSection";
import AccentColorSection from "./AccentColorSection";
import ThemeSection from "./ThemeSection";
import DensitySection from "./DensitySection";
import AnimationSection from "./AnimationSection";
import useAppearanceSettings from "./useAppearanceSettings";

type SettingsAppearanceProps = {
  user: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function SettingsAppearance({
  user,
  setCurrentUser,
}: SettingsAppearanceProps) {
  const {
    previewAvatar,
    previewBanner,
    previewColor,
    previewTheme,
    previewMode,
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
  } = useAppearanceSettings({
    user,
    setCurrentUser,
  });

  return (
    <div className="dashboard-card rounded-4xl compact:rounded-2xl p-6 compact:p-3">
      <div className="mb-6 compact:mb-3">
        <h2 className="dashboard-heading mb-2 compact:mb-1">Appearance</h2>
        <p className="dashboard-muted-text">
          Customize how your dashboard looks and feels.
        </p>
      </div>

      <div className="flex flex-col gap-8 compact:gap-4">
        <ProfilePictureSection
          user={user}
          previewAvatar={previewAvatar}
          previewColor={previewColor}
          handleAvatarChange={handleAvatarChange}
          handleRemoveAvatar={handleRemoveAvatar}
        />
        <ProfileBannerSection
          user={user}
          previewColor={previewColor}
          previewBanner={previewBanner}
          handleBannerChange={handleBannerChange}
          handleRemoveBanner={handleRemoveBanner}
        />
        <AccentColorSection
          user={user}
          colors={colors}
          previewColor={previewColor}
          handleUserColorChange={handleUserColorChange}
        />
        <ThemeSection
          handleThemePreview={handleThemePreview}
          previewColor={previewColor}
          previewTheme={previewTheme}
        />
        <DensitySection
          previewMode={previewMode}
          handleModePreview={handleModePreview}
        />
        <AnimationSection
          handleAnimationsPreview={handleAnimationsPreview}
          canAnimate={canAnimate}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveAppearance}
            className={`dashboard-button-success w-fit 
            ${!hasChanges ? "opacity-50 cursor-not-allowed hover:bg-green-800" : "hover:bg-green-600"}`}
            disabled={!hasChanges}
          >
            Save Changes
          </button>
          <button
            onClick={handleRestoreDefaultOptions}
            className="dashboard-button-secondary w-fit"
          >
            Restore Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
