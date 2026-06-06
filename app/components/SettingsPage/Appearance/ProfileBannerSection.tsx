import type { User } from "../../UsersPage/users.types";

type ProfileBannerSectionProps = {
  user: User | null;
  previewBanner: string;
  previewColor: string;
  handleBannerChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveBanner: () => void;
};

export default function ProfilePictureSection({
  user,
  previewColor,
  previewBanner,
  handleBannerChange,
  handleRemoveBanner,
}: ProfileBannerSectionProps) {
  return (
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
  );
}
