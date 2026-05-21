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
  const [color, setColor] = useState(user.color);
  const [bio, setBio] = useState(user.bio);

  function saveChanges() {
    const updateUser = {
      ...user,
      name: newUsername || user.name,
      bio,
      color,
    };
    onSave(updateUser);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-999">
      <div className="w-140 rounded-[28px] bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative h-42 bg-linear-to-br from-slate-950 to-slate-800 border-b border-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-r from-black/85 from-30% via-black/50 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={() => onClose()}
            className="z-10 absolute top-5 right-5 w-10 h-10 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-700 backdrop-blur-md flex items-center justify-center transition cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* Profile */}
          <div className="absolute left-8 bottom-6 flex items-end gap-5">
            {/* Avatar */}
            <div className="relative">
              <div
                style={{ backgroundColor: color }}
                className="w-28 h-28 rounded-full border-[5px] border-slate-950  flex items-center justify-center text-black text-5xl font-bold select-none"
              >
                {user.name[0].toUpperCase()}
              </div>

              <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition cursor-pointer">
                ✎
              </button>
            </div>

            {/* User info */}
            <div className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder={`${user.name}`}
                  className="w-[70%] bg-transparent text-4xl font-bold outline-none border border-slate-800 focus:border-slate-700 rounded-xl px-3 py-1"
                />

                <div className="px-4 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-semibold">
                  Admin
                </div>
              </div>
              <p className="text-sm text-slate-500">Joined: {user.joined}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col gap-6">
          {/* Bio */}
          <div>
            <p className="text-sm text-slate-400 mb-2">Bio</p>
            <textarea
              placeholder={`${user.bio}`}
              className="w-full h-28 resize-none rounded-2xl bg-slate-950 border border-slate-800 p-4 outline-none focus:border-slate-700 transition"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>

          {/* Profile color */}
          <div>
            <p className="text-sm text-slate-400 mb-3">Profile Color</p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setColor("#fb2c36")}
                className="w-10 h-10 rounded-full bg-red-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#ff6900")}
                className="w-10 h-10 rounded-full bg-orange-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#f0b100")}
                className="w-10 h-10 rounded-full bg-yellow-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#7ccf00")}
                className="w-10 h-10 rounded-full bg-lime-500 border-2 border-white hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#00b8db")}
                className="w-10 h-10 rounded-full bg-cyan-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#2b7fff")}
                className="w-10 h-10 rounded-full bg-blue-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#ad46ff")}
                className="w-10 h-10 rounded-full bg-purple-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
              <button
                onClick={() => setColor("#f6339a")}
                className="w-10 h-10 rounded-full bg-pink-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"
              ></button>
            </div>
          </div>

          {/* Banner */}
          <div>
            <p className="text-sm text-slate-400 mb-3">Banner</p>
            <button className="w-full h-28 rounded-2xl bg-slate-950 border border-dashed border-slate-700 hover:border-slate-500 transition flex items-center justify-center text-slate-400 cursor-pointer">
              Upload Banner
            </button>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 border border-slate-700 transition cursor-pointer">
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
