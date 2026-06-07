import { X } from "lucide-react";
import type { User } from "../users.types";
import { useEffect } from "react";

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

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div className="dashboard-modal-overlay" onClick={onClose}>
      <div
        className="dashboard-card rounded-2xl p-6 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-6 compact:mb-3">User Details</h1>
          <button
            className="text-slate-400 hover:text-white light:hover:text-black cursor-pointer h-fit"
            onClick={onClose}
          >
            <X />
          </button>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xl mb-2 compact:gap-1 compact:mb-1">
            {/* Icon */}
            <button
              style={{
                backgroundColor: user.color,
                color: user.textColor,
                borderColor: user.textColor,
              }}
              className="w-16 h-16 rounded-full flex justify-center items-center border text-2xl compact:text-xl font-bold select-none relative"
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
              <div className="flex gap-2 compact:gap-1 items-center mb-1 compact:mb-0.5 font-bold">
                <div>{user.name}</div>
                {/* Role badges */}
                <div
                  className={`dashboard-user-badge ${roleStyles[user.role]}`}
                >
                  {user.role}
                </div>
              </div>
              {/* Join date info */}
              <div className="text-xs text-slate-4000">
                Joined: {user.joined}
              </div>
            </div>
          </div>
          {/* Bio */}
          {user.bio ? (
            <div className="text-sm bg-slate-800 w-fit px-3 py-2 rounded-2xl compact:px-1.5 compact:py-1 compact:rounded-xl light:bg-white">
              {user.bio}
            </div>
          ) : (
            <div className="text-sm bg-slate-800 w-fit px-3 py-2 rounded-2xl compact:px-2 compact:py-1 compact:rounded-xl light:bg-white">
              No status set
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mt-5 compact:gap-1.5 compact:mt-2.5">
            <div className="dashboard-stat-box compact:rounded-xl compact:p-2 compact:h-fit">
              <div className="dashboard-subtitle">Projects</div>
              <div className="dashboard-heading">{user.projects}</div>
            </div>
            <div className="dashboard-stat-box compact:rounded-xl compact:p-2 compact:h-fit">
              <div className="dashboard-subtitle">Reports</div>
              <div className="dashboard-heading">{user.reports}</div>
            </div>
            <div className="dashboard-stat-box compact:rounded-xl compact:p-2 compact:h-fit">
              <div className="dashboard-subtitle">Tasks</div>
              <div className="dashboard-heading">{user.tasks}</div>
            </div>
            <div className="dashboard-stat-box compact:rounded-xl compact:p-2 compact:h-fit">
              <div className="dashboard-subtitle">Commits</div>
              <div className="dashboard-heading">{user.commits}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
