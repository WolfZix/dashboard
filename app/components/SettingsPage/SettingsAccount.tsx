import { useRef, useState } from "react";
import type { User } from "../UsersPage/users.types";

type SettingsAccountProps = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function SettingsAccount({
  user,
  setUser,
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
      setUser(updateUser);
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
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 light:bg-white light:border-[#e2e8f0] transition-all duration-300">
      <h2 className="text-2xl font-bold mb-6">Account</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Profile Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Username
            </label>
            <input
              type="text"
              placeholder={`${user?.name || "Username"}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ "--border-color": user?.color } as React.CSSProperties}
              className={`
              text-gray-400
              focus:text-white
              w-full
              px-4
              py-3
              rounded-xl
              bg-slate-800
              border border-slate-700
              border-t-(--border-color)
              outline-none
              focus:border-lime-500
              light:bg-slate-100
              light:border-slate-300
            `}
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Email</label>
            <input
              type="email"
              placeholder={user?.email || "example@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ "--border-color": user?.color } as React.CSSProperties}
              className="
              text-gray-400
              focus:text-white
              w-full
              px-4
              py-3
              rounded-xl
              bg-slate-800
              border border-slate-700
              border-t-(--border-color)
              outline-none
              focus:border-lime-500
              light:bg-slate-100
              light:border-slate-300
            "
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">Bio</label>
            <textarea
              rows={4}
              placeholder={user?.bio || "Tell us about yourself..."}
              style={{ "--border-color": user?.color } as React.CSSProperties}
              className="
              text-gray-400
              focus:text-white
              w-full
              px-4
              py-3
              rounded-xl
              bg-slate-800
              border border-slate-700
              border-t-(--border-color)
              outline-none
              resize-none
              focus:border-lime-500
              light:bg-slate-100
              light:border-slate-300
            "
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Security</h3>

        <div className="space-y-4">
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
            className="
            focus:text-white
            w-full
            px-4
            py-3
            rounded-xl
            bg-slate-800
            border border-slate-700
            border-t-(--border-color)
            outline-none
            focus:border-lime-500
            light:bg-slate-100
            light:border-slate-300
          "
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
            className="
            focus:text-white
            w-full
            px-4
            py-3
            rounded-xl
            bg-slate-800
            border border-slate-700
            border-t-(--border-color)
            outline-none
            focus:border-lime-500
            light:bg-slate-100
            light:border-slate-300
          "
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
            className="
            focus:text-white
            w-full
            px-4
            py-3
            rounded-xl
            bg-slate-800
            border border-slate-700
            border-t-(--border-color)
            outline-none
            focus:border-lime-500
            light:bg-slate-100
            light:border-slate-300
          "
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Statistics</h3>

        <div className="grid grid-cols-2 gap-4">
          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="bg-slate-800 light:bg-slate-100 rounded-xl p-4 border border-slate-800 border-t-(--border-color)"
          >
            <p className="text-sm text-slate-400">Joined</p>
            <p className="font-semibold">{user?.joined}</p>
          </div>

          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="bg-slate-800 light:bg-slate-100 rounded-xl p-4 border border-slate-800 border-t-(--border-color)"
          >
            <p className="text-sm text-slate-400">Projects</p>
            <p className="font-semibold">{user?.projects}</p>
          </div>

          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="bg-slate-800 light:bg-slate-100 rounded-xl p-4 border border-slate-800 border-t-(--border-color)"
          >
            <p className="text-sm text-slate-400">Tasks</p>
            <p className="font-semibold">{user?.tasks}</p>
          </div>

          <div
            style={{ "--border-color": user?.color } as React.CSSProperties}
            className="bg-slate-800 light:bg-slate-100 rounded-xl p-4 border border-slate-800 border-t-(--border-color)"
          >
            <p className="text-sm text-slate-400">Commits</p>
            <p className="font-semibold">{user?.commits}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          onClick={saveChanges}
          disabled={!hasChanges}
          className="
          px-5
          py-3
          rounded-xl
          bg-lime-600
          hover:bg-lime-500
          transition-all
          duration-300
          cursor-pointer
        "
        >
          Save Changes
        </button>

        <button
          style={{ "--border-color": user?.color } as React.CSSProperties}
          onClick={() => exportData()}
          className="
          px-5
          py-3
          rounded-xl
          bg-slate-800
          hover:bg-slate-700
          light:bg-slate-200
          light:hover:bg-slate-300
          transition-all
          duration-300
          cursor-pointer
        "
        >
          Export Data
        </button>
      </div>

      <div className="border border-red-500/30 rounded-2xl p-5">
        <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
        <p className="text-sm text-slate-400 mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          className="
          px-5
          py-3
          rounded-xl
          bg-red-600
          hover:bg-red-500
          transition-all
          duration-300
          cursor-pointer
        "
        >
          Delete Account
        </button>
      </div>
      {toast && (
        <div className="fixed bottom-5 right-5 z-999 overflow-hidden rounded-2xl compact:rounded-xl border border-slate-700 bg-slate-900 shadow-2xl min-w-80 transition-all duration-300">
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-lime-400 animate-[toast_2s_linear_forwards] transition-all duration-300"></div>

          <div className="flex items-center gap-3 px-5 py-4 compact:gap-1.5 compact:px-2.5 compact:py-2 transition-all duration-300">
            {/* Icon */}
            <div
              className={`w-3 h-3 transition-all duration-300 rounded-full ${
                toast.type === "success" ? "bg-lime-400" : "bg-red-400"
              }`}
            ></div>

            {/* Content */}
            <div className="flex flex-col transition-all duration-300">
              <p className="font-semibold transition-all duration-300">
                {toast.type === "success" ? "Success!" : "Error!"}
              </p>

              <p className="text-sm text-slate-400 transition-all duration-300">
                {toast.message}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
