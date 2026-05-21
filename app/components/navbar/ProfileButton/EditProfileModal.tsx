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
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [banner, setBanner] = useState(user.banner || "");

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
      ? "bg-red-500"
      : role === "Moderator"
        ? "bg-orange-500"
        : role === "Premium"
          ? "bg-purple-500"
          : "bg-slate-500";
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999 p-6 overflow-y-auto">
      <div className="w-140 max-w-full rounded-[28px] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="relative h-44 bg-linear-to-br from-slate-950 to-slate-800 border-b border-slate-800 overflow-hidden">
          {banner ? (
            <img
              src={banner}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : null}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/85"></div>

          {/* Close button */}
          <button
            onClick={() => onClose()}
            className="z-20 absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Banner edit */}
          <label className="absolute bottom-5 right-5 z-20 w-11 h-11 rounded-2xl bg-slate-950/70 hover:bg-slate-900 border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer">
            ✎
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerUpload}
            />
          </label>

          {/* Profile */}
          <div className="absolute left-8 bottom-6 z-20 flex items-end gap-5">
            {/* Avatar */}
            <div
              style={{ backgroundColor: "black", borderColor: color }}
              className="relative rounded-full border"
            >
              <div
                style={{ backgroundColor: user.color }}
                className="w-28 h-28 rounded-full flex items-center justify-center text-black text-5xl font-bold select-none shadow-2xl m-1.25"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    className="w-full h-full object-cover rounded-full scale-[1.01]"
                  />
                ) : (
                  user.name[0].toUpperCase()
                )}
              </div>

              {/* Avatar edit */}
              <label className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition cursor-pointer">
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
            <div className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-4xl font-bold">{user.name}</div>

                <div
                  className={`px-4 py-1 rounded-full ${getRoleColor(user.role)} text-sm font-semibold`}
                >
                  {user.role}
                </div>
              </div>

              <p className="text-sm text-slate-300">Joined: {user.joined}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6">
          {/* Username */}
          <div>
            <p className="text-sm text-slate-400 mb-2">Change Username</p>

            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder={user.name}
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-4 outline-none focus:border-slate-700 transition"
            />
          </div>

          {/* Password */}
          <div>
            <p className="text-sm text-slate-400 mb-2">Change Password</p>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-4 outline-none focus:border-slate-700 transition"
            />
          </div>

          {/* Bio */}
          <div>
            <p className="text-sm text-slate-400 mb-2">Bio</p>

            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself..."
              className="w-full h-15 resize-none rounded-2xl bg-slate-950 border border-slate-800 p-4 outline-none focus:border-slate-700 transition"
            ></textarea>
          </div>

          {/* Profile color */}
          <div>
            <p className="text-sm text-slate-400 mb-3">Profile Color</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setColor("#fb2c36")}
                className="w-7 h-7 rounded-full bg-red-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#ff6900")}
                className="w-7 h-7 rounded-full bg-orange-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#f0b100")}
                className="w-7 h-7 rounded-full bg-yellow-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#7ccf00")}
                className="w-7 h-7 rounded-full bg-lime-500 border-2 border-white hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#00b8db")}
                className="w-7 h-7 rounded-full bg-cyan-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#2b7fff")}
                className="w-7 h-7 rounded-full bg-blue-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#ad46ff")}
                className="w-7 h-7 rounded-full bg-purple-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#f6339a")}
                className="w-7 h-7 rounded-full bg-pink-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#000000")}
                className="w-7 h-7 rounded-full bg-black border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#FFFFFF")}
                className="w-7 h-7 rounded-full bg-white border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>

              <button
                onClick={() => setColor("#62748e")}
                className="w-7 h-7 rounded-full bg-slate-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={saveChanges}
              className="flex-1 py-4 rounded-2xl bg-lime-600 hover:bg-lime-500 text-black font-semibold transition cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
