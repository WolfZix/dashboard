import { useState } from "react";
import type { User } from "./users.types";

type EditUserModalProps = {
  user: User;
  onClose: () => void;
};

export default function EditUserModal({ user, onClose }: EditUserModalProps) {
  const [bio, setBio] = useState(user.bio);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 light:bg-white border border-slate-700 light:border-[#e2e8f0] rounded 2xl p-6 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-6">Edit User</h1>
        <div className="mb-5">
          <div className="text-sm text-slate-400 mb-2">Bio</div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-32 bg-slate-800 light:bg-slate-100 rounded-xl p-4 outline-none resize-none"
          />
        </div>
        <button className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
