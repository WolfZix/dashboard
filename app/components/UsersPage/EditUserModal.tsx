import { useState } from "react";
import type { User } from "./users.types";
import { Edit, X } from "lucide-react";
import ColorPicker from "./ColorPicker";

type EditUserModalProps = {
  user: User;
  onClose: () => void;
  currentUserRole: User["role"];
};

export default function EditUserModal({
  user,
  onClose,
  currentUserRole,
}: EditUserModalProps) {
  const [role, setRole] = useState(user.role);
  const [color, setColor] = useState(user.color);
  const [selectFocused, setSelectFocused] = useState(false);
  const [open, setOpen] = useState(false);

  const statusColor = {
    Online: "bg-lime-400",
    Busy: "bg-red-400",
    Away: "bg-yellow-400",
    Offline: "bg-slate-400",
  };

  const roleStyles = {
    Admin: "bg-red-800",
    Moderator: "bg-blue-800",
    Premium: "bg-purple-800",
    User: "bg-slate-800",
  };

  const roleOptions = {
    Admin: ["Admin", "Moderator", "Premium", "User"],
    Moderator: ["Premium", "User"],
    Premium: [],
    User: [],
  };

  function saveChanges() {
    user.color = color;
    user.role = role;
    onClose();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 light:bg-white border border-slate-700 light:border-[#e2e8f0] rounded 2xl p-6 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">Edit User</h1>
          <button
            className="text-slate-400 hover:text-white light:hover:text-black cursor-pointer h-fit"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-4 text-xl mb-2">
            {/* Icon */}
            <div>
              <button
                style={{ backgroundColor: color }}
                className="w-16 h-16 rounded-full p-5 flex justify-center items-center border-2 border-black text-black text-2xl font-bold select-none relative"
              >
                {user.name[0]}
                <div
                  className={`${statusColor[user.status]} absolute bottom-0 left-0 w-5 h-5 rounded-full border-2 border-black`}
                ></div>
                <button
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 light:bg-white border border-slate-700 light:border-[#e2e8f0] flex items-center justify-center text-slate-300 light:text-slate-700 hover:scale-105 hover:text-white light:hover:text-black transition cursor-pointer shadow-lg"
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <Edit size={14} />
                </button>
              </button>
              {open && <ColorPicker color={color} setColor={setColor} />}
            </div>
            <div>
              {/* Profile info */}
              <div className="flex gap-2 items-center mb-1">
                <div>{user.name}</div>
                {/* Role badges */}
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as User["role"])}
                  disabled={
                    currentUserRole === "User" || currentUserRole === "Premium"
                  }
                  onClick={() => setSelectFocused((prev) => !prev)}
                  onBlur={() => setSelectFocused(false)}
                  className={`bg-slate-800 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 cursor-pointer rounded-xl p-1 outline-none text-sm ${
                    selectFocused
                      ? "rounded-t-xl rounded-bl-none rounded-br-none"
                      : "rounded-xl"
                  }`}
                >
                  {roleOptions[currentUserRole].map((roleOption) => (
                    <option key={roleOption} value={roleOption}>
                      {roleOption}
                    </option>
                  ))}
                </select>
              </div>
              {/* Join date info */}
              <div className="text-xs text-slate-400">
                Joined: {user.joined}
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full py-3 mt-6 rounded-xl bg-green-800 hover:bg-green-700 light:bg-green-600 light:hover:bg-green-500 transition cursor-pointer"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
