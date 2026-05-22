import { X } from "lucide-react";
import type { User } from "../users.types";

type UserModalProps = {
  user: User;
  onClose: () => void;
};

export default function UserModal({ user, onClose }: UserModalProps) {
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

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 light:bg-slate-200 border border-slate-700 light:border-[#e2e8f0] rounded-2xl p-6 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6">User Details</h1>
          <button
            className="text-slate-400 hover:text-white light:hover:text-black cursor-pointer h-fit"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xl mb-2">
            {/* Icon */}
            <button
              style={{
                backgroundColor: user.color,
                color: user.textColor,
                borderColor: user.textColor,
              }}
              className="w-16 h-16 rounded-full flex justify-center items-center border text-2xl font-bold select-none relative"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="w-full h-full object-cover rounded-full scale-[0.97]"
                />
              ) : (
                user.name[0]
              )}
              <div
                className={`${statusColor[user.status]} absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-black`}
              ></div>
            </button>
            <div>
              {/* Profile info */}
              <div className="flex gap-2 items-center mb-1 font-bold">
                <div>{user.name}</div>
                {/* Role badges */}
                <div
                  className={`text-white font-normal text-xs px-2 py-1 rounded-2xl select-none ${roleStyles[user.role]}`}
                >
                  {user.role}
                </div>
              </div>
              {/* Join date info */}
              <div className="text-xs text-slate-400">
                Joined: {user.joined}
              </div>
            </div>
          </div>
          {/* Bio */}
          {user.bio ? (
            <div className="text-sm bg-slate-800 w-fit px-3 py-2 rounded-2xl light:bg-white">
              {user.bio}
            </div>
          ) : (
            <div className="text-sm bg-slate-800 w-fit px-3 py-2 rounded-2xl light:bg-white">
              No status set
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mt-5">
            <div className="bg-slate-800 light:bg-slate-100 rounded-2xl p-4">
              <div className="text-slate-400 text-sm">Projects</div>
              <div className="text-2xl font-bold">{user.projects}</div>
            </div>
            <div className="bg-slate-800 light:bg-slate-100 rounded-2xl p-4">
              <div className="text-slate-400 text-sm">Reports</div>
              <div className="text-2xl font-bold">{user.reports}</div>
            </div>
            <div className="bg-slate-800 light:bg-slate-100 rounded-2xl p-4">
              <div className="text-slate-400 text-sm">Tasks</div>
              <div className="text-2xl font-bold">{user.tasks}</div>
            </div>
            <div className="bg-slate-800 light:bg-slate-100 rounded-2xl p-4">
              <div className="text-slate-400 text-sm">Commits</div>
              <div className="text-2xl font-bold">{user.commits}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
