import { X } from "lucide-react";
import type { User } from "../../UsersPage/users.types";
import { useState } from "react";

type EditProfileModalProps = {
  user: User;
  onClose: () => void;
  onSave: (updateUser: User) => void;
};

export default function EditProfileModal({
  user,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [color, setColor] = useState(user.color);
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [banner, setBanner] = useState(user.banner || "");
  let isActive = false;

  function saveChanges() {
    const changedFields: string[] = [];
    if (newUsername && newUsername !== user.name) {
      changedFields.push("username");
    }
    if (bio !== user.bio) {
      changedFields.push("bio");
    }
    if (color !== user.color) {
      changedFields.push("profile_color");
    }
    if (avatar !== (user.avatar || "")) {
      changedFields.push("profile_picture");
    }
    if (banner !== (user.banner || "")) {
      changedFields.push("banner");
    }
    if (newPassword && newPassword !== localStorage.getItem("password")) {
      changedFields.push("password");
      localStorage.setItem("password", newPassword);
    }
    if (changedFields.length === 0) {
      onClose();
      return;
    }
    let newActivity;
    if (changedFields.length > 1) {
      newActivity = {
        id: crypto.randomUUID(),
        type: "profile_update",
        message: "Updated profile",
        date: new Date().toISOString(),
      };
    } else {
      const changed = changedFields[0];
      newActivity = {
        id: crypto.randomUUID(),
        type: changed,
        message:
          changed === "username"
            ? "Updated username"
            : changed === "bio"
              ? "Updated bio"
              : changed === "profile_picture"
                ? "Updated profile picture"
                : changed === "profile_color"
                  ? "Updated profile's color"
                  : changed === "banner"
                    ? "Updated banner"
                    : changed === "password"
                      ? "Password changed"
                      : "Updated profile",
        date: new Date().toISOString(),
      };
    }

    const updateUser = {
      ...user,
      name: newUsername || user.name,
      bio,
      color,
      avatar,
      banner,
      activity: [newActivity, ...(user.activity || [])],
    };

    onSave(updateUser);
    onClose();
  }

  function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBanner(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  function getRoleColor(role: string) {
    return role === "Admin"
      ? "bg-red-500 text-white"
      : role === "Moderator"
        ? "bg-orange-500 text-white"
        : role === "Premium"
          ? "bg-purple-500 text-white"
          : "bg-slate-500 text-white";
  }

  const colors = [
    "#fb2c36", // red
    "#ff6900", // orange
    "#f0b100", // amber
    "#22c55e", // green
    "#00b8db", // cyan
    "#2b7fff", // blue
    "#ad46ff", // purple
    "#f6339a", // pink
    "#000000", // black
    "#ffffff", // white
    "#62748e", // slate
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999 p-6 overflow-y-auto transition-all duration-300">
      <div className="w-140 max-w-full rounded-[28px] bg-slate-900 light:bg-slate-200 border border-slate-800 overflow-hidden shadow-2xl my-auto transition-all duration-300">
        {/* Header */}
        <div
          style={{
            borderColor: `${color}50`,
            boxShadow: `0 0 20px ${color}30`,
          }}
          className="relative h-44 bg-linear-to-br from-slate-950 to-slate-800 light:bg-slate-300 border-b overflow-hidden transition-all duration-300"
        >
          {banner ? (
            <img
              src={banner}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-300"
            />
          ) : null}

          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/85 transition-all duration-300
          ${color === "#ffffff" ? "light:bg-black/50" : ""}`}
          ></div>

          {/* Close button */}
          <button
            onClick={() => onClose()}
            className="z-20 absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-950/70 light:bg-white hover:bg-slate-900 border light:hover:bg-slate-200 border-slate-700 light:border-slate-400 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Banner edit */}
          <label className="absolute bottom-5 right-5 z-20 w-11 h-11 rounded-2xl light:text-slate-950 bg-slate-950/70 light:bg-white hover:bg-slate-900 border light:hover:bg-slate-200 border-slate-700 light:border-slate-400 backdrop-blur-md flex items-center justify-center transition-all duration-300 cursor-pointer">
            ✎
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
          </label>

          {/* Profile */}
          <div className="absolute left-8 bottom-6 z-20 flex items-end gap-5 transition-all duration-300">
            {/* Avatar */}
            <div
              style={{
                backgroundColor: "black",
                borderColor: `${color}35`,
                boxShadow: `0 0 20px ${color}25`,
              }}
              className="relative rounded-full border transition-all duration-300"
            >
              <div
                style={{ backgroundColor: user.color }}
                className="w-28 h-28 rounded-full flex items-center justify-center text-black text-5xl font-bold select-none shadow-2xl m-1.25 transition-all duration-300"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    className="w-full h-full object-cover rounded-full scale-[1.01] transition-all duration-300"
                  />
                ) : (
                  user.name[0].toUpperCase()
                )}
              </div>

              {/* Avatar edit */}
              <label className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 light:bg-white light:border-slate-400 flex items-center justify-center hover:bg-slate-800 light:hover:bg-slate-200 transition-all duration-300 cursor-pointer">
                ✎
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>
            </div>

            {/* User info */}
            <div className="pb-2 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2 transition-all duration-300">
                <div
                  style={{
                    color: `${color}`,
                  }}
                  className="text-4xl font-bold transition-all duration-300"
                >
                  {user.name}
                </div>

                <div
                  className={`px-4 py-1 rounded-full ${getRoleColor(user.role)} text-sm font-semibold transition-all duration-300`}
                >
                  {user.role}
                </div>
              </div>

              <p className="text-sm text-slate-300 transition-all duration-300">
                Joined: {user.joined}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6 transition-all duration-300">
          {/* Username */}
          <div>
            <p className="text-sm text-slate-400 light:text-slate-700 mb-2 transition-all duration-300">
              Change Username
            </p>

            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder={user.name}
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 light:bg-white light:border-slate-300 light:focus:border-slate-400 px-4 py-4 outline-none focus:border-slate-700 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <p className="text-sm text-slate-400 light:text-slate-700 mb-2 transition-all duration-300">
              Change Password
            </p>

            <input
              type="password"
              value={newPassword}
              placeholder="•••••••••"
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 light:bg-white light:border-slate-300 light:focus:border-slate-400 px-4 py-4 outline-none focus:border-slate-700 transition-all duration-300"
            />
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm text-slate-400 light:text-slate-700 mb-2">
              Bio
            </p>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder={user.bio}
              className="w-full h-15 resize-none rounded-2xl bg-slate-950 border border-slate-800 light:bg-white light:border-slate-300 light:focus:border-slate-400 p-4 outline-none focus:border-slate-700 transition-all duration-300"
            ></textarea>
          </div>

          {/* Profile color */}
          <div>
            <p className="text-sm text-slate-400 light:text-slate-700 mb-3 transition-all duration-300">
              Profile Color
            </p>
            <div className="flex flex-wrap gap-3 justify-center transition-all duration-300">
              {colors.map((buttonColor) => (
                <button
                  key={buttonColor}
                  onClick={() => setColor(buttonColor)}
                  style={{ "--bg": buttonColor } as React.CSSProperties}
                  className={`w-7 h-7 rounded-full bg-(--bg) border transition-all duration-300 cursor-pointer
                    ${
                      color === buttonColor
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
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2 transition-all duration-300">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 light:bg-white light:border-slate-300 light:hover:bg-slate-200 border border-slate-700 transition-all duration-300 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              style={
                {
                  boxShadow: `0px 0px 20px ${color}50`,
                  "--border-color": `${color}90`,
                  "--text": `${color}`,
                  "--hover-text": `${color}`,
                  "--bg": `${color}20`,
                  "--hover-bg": `${color}70`,
                } as React.CSSProperties
              }
              className={`flex-1 py-4 border border-(--border-color) rounded-2xl font-semibold cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-(--hover-bg) bg-(--bg) text-(--text) hover:text-(--hover-text)
                ${
                  color === "#000000"
                    ? "text-white/75 bg-black/75 hover:text-white hover:bg-black"
                    : color === "#ffffff"
                      ? "light:text-black/75 light:bg-white light:border-slate-300 light:hover:text-black light:hover:bg-slate-200"
                      : ""
                }`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
