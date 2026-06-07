import type { User } from "../../UsersPage/users.types";

type ProfilePictureSectionProps = {
  user: User | null;
  previewAvatar: string;
  previewColor: string;
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAvatar: () => void;
};

export default function ProfilePictureSection({
  user,
  previewAvatar,
  previewColor,
  handleAvatarChange,
  handleRemoveAvatar,
}: ProfilePictureSectionProps) {
  return (
    <div className="flex flex-col">
      <p className="dashboard-section-label mb-3 compact:mb-1.5">
        Profile Picture
      </p>
      <div className="flex flex-col w-fit items-center gap-5 compact:gap-2.5">
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
          <div
            style={
              {
                "--background-color": previewColor || "#22c55e",
                "--text-color":
                  previewColor === "#000000" ? "#FFFFFF" : "#000000",
              } as React.CSSProperties
            }
            className="w-40 h-40 rounded-full flex items-center justify-center text-5xl font-bold bg-(--background-color) text-(--text-color)"
          >
            {user?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <div className="flex gap-2 compact:gap-1">
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
  );
}
