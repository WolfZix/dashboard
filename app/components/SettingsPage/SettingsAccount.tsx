import { useRef, useState } from "react";
import type { User } from "../UsersPage/users.types";

type SettingsAccountProps = {
  user: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function SettingsAccount({
  user,
  setCurrentUser,
}: SettingsAccountProps) {
  const [username, setUsername] = useState(user?.name || "User");
  const [email, setEmail] = useState(user?.email || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const hasChanges =
    username !== user?.name ||
    email !== user?.email ||
    bio !== user?.bio ||
    newPassword;

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function saveChanges() {
    if (!user) return;
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    if (newPassword) {
      if (currentPassword !== user.password) {
        setToast({ type: "error", message: "Current password is incorrect" });
        toastTimeoutRef.current = setTimeout(() => {
          setToast(null);
        }, 2000);
        return;
      }
      if (newPassword != confirmPassword) {
        setToast({ type: "error", message: "Passwords do not match" });
        toastTimeoutRef.current = setTimeout(() => {
          setToast(null);
        }, 2000);
        return;
      }

      const updateUser: User = {
        ...user,
        name: username,
        email,
        bio,
        password: newPassword ? newPassword : user.password,
      };
      setCurrentUser(updateUser);
      const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u) =>
        u.id === user.id ? updateUser : u,
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      window.dispatchEvent(new Event("usersUpdated"));

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setToast({ type: "success", message: "Saved changes" });
      setTimeout(() => {
        setToast(null);
      }, 2000);
    }
  }

  function exportData() {
    if (!user) return;
    const blob = new Blob([JSON.stringify(user, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${user.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="dashboard-card rounded-2xl p-6 compact:p-3">
      <h2 className="dashboard-heading mb-6 compact:mb-3 transition-all duration-300">
        Account
      </h2>

      <div className="mb-8 compact:mb-4">
        <h3 className="dashboard-section-title">Profile Information</h3>

        <div>
          <div>
            <label className="dashboard-label">Username</label>
            <input
              type="text"
              placeholder={`${user?.name || "Username"}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ "--border-color": user?.color } as React.CSSProperties}
              className={`dashboard-input mb-4 compact:mb-2 text-gray-400 focus:text-white border-t-(--border-color)`}
            />
          </div>

          <div>
            <label className="dashboard-label">Email</label>
            <input
              type="email"
              placeholder={user?.email || "example@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ "--border-color": user?.color } as React.CSSProperties}
              className="dashboard-input mb-4 compact:mb-2 text-gray-400 focus:text-white border-t-(--border-color)"
            />
          </div>

          <div>
            <label className="dashboard-label">Bio</label>
            <textarea
              rows={4}
              placeholder={user?.bio || "Tell us about yourself..."}
              style={{ "--border-color": user?.color } as React.CSSProperties}
              className="dashboard-input mb-4 compact:mb-2 text-gray-400 focus:text-white border-t-(--border-color) resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-8 compact:mb-4">
        <h3 className="dashboard-section-title">Security</h3>

        <div>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (toast?.type === "error") {
                setToast(null);
              }
            }}
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-input mb-4 compact:mb-2 focus:text-white border-t-(--border-color)"
          />

          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              if (toast?.type === "error") {
                setToast(null);
              }
            }}
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-input mb-4 compact:mb-2 focus:text-white border-t-(--border-color)"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (toast?.type === "error") {
                setToast(null);
              }
            }}
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-input mb-4 compact:mb-2 focus:text-white border-t-(--border-color)"
          />
        </div>
      </div>

      <div className="mb-8 compact:mb-4">
        <h3 className="dashboard-section-title">Statistics</h3>

        <div className="grid grid-cols-2 gap-4 compact:gap-2">
          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-stat-box border-t-(--border-color)"
          >
            <p className="dashboard-stat-label">Joined</p>
            <p className="dashboard-stat-value">{user?.joined}</p>
          </div>

          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-stat-box border-t-(--border-color)"
          >
            <p className="dashboard-stat-label">Projects</p>
            <p className="dashboard-stat-value">{user?.projects}</p>
          </div>

          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-stat-box border-t-(--border-color)"
          >
            <p className="dashboard-stat-label">Tasks</p>
            <p className="dashboard-stat-value">{user?.tasks}</p>
          </div>

          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="dashboard-stat-box border-t-(--border-color)"
          >
            <p className="dashboard-stat-label">Commits</p>
            <p className="dashboard-stat-value">{user?.commits}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-8 compact:gap-1.5 compact:mb-4">
        <button
          onClick={saveChanges}
          disabled={!hasChanges}
          className="dashboard-button bg-lime-600 hover:bg-lime-500"
        >
          Save Changes
        </button>

        <button
          style={{ "--border-color": user?.color } as React.CSSProperties}
          onClick={() => exportData()}
          className="dashboard-button-secondary"
        >
          Export Data
        </button>
      </div>

      <div className="border border-red-500/30 rounded-2xl p-5 compact:p-2.5">
        <h3 className="text-red-400 font-semibold mb-2 compact:mb-1">
          Danger Zone
        </h3>
        <p className="dashboard-subtitle mb-4 compact:mb-2">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button className="dashboard-button bg-red-600 hover:bg-red-500">
          Delete Account
        </button>
      </div>
      {toast && (
        <div className="fixed bottom-5 right-5 z-999 overflow-hidden rounded-2xl compact:rounded-xl border dashboard-border bg-slate-900 shadow-2xl min-w-80">
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-lime-400 animate-[toast_2s_linear_forwards]"></div>

          <div className="flex items-center gap-3 px-5 py-4 compact:gap-1.5 compact:px-2.5 compact:py-2">
            {/* Icon */}
            <div
              className={`w-3 h-3 rounded-full ${
                toast.type === "success" ? "bg-lime-400" : "bg-red-400"
              }`}
            ></div>

            {/* Content */}
            <div className="flex flex-col">
              <p className="font-semibold">
                {toast.type === "success" ? "Success!" : "Error!"}
              </p>

              <p className="dashboard-subtitle">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
