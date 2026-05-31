import { useState } from "react";
import type { User } from "../users.types";

type CreateUserModalProps = {
  onClose: () => void;
  onCreate: (newUser: User) => void;
};

export default function CreateUserModal({
  onClose,
  onCreate,
}: CreateUserModalProps) {
  const [name, setName] = useState(
    "User" + (JSON.parse(localStorage.getItem("users") || "[]").length + 1),
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<User["role"]>("User");

  function createUser() {
    if (!name.trim()) return;

    const newUser: User = {
      id:
        Math.max(
          ...JSON.parse(localStorage.getItem("users") || "[]").map(
            (u: User) => u.id,
          ),
          0,
        ) + 1,
      name,
      email,
      role,
      status: "Offline",
      joined: new Date().toISOString().split("T")[0],
      bio: "",
      projects: 0,
      reports: 0,
      tasks: 0,
      commits: 0,
      color: "#22c55e",
      textColor: "#000000",
      password: password || "",
    };

    onCreate(newUser);
    onClose();
  }
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="dashboard-card rounded-2xl p-6 compact:rounded-xl compact:p-3 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-6 compact:mb-3">Create User</h1>
        <div className="space-y-4 compact:space-y-2">
          <p className="text-slate-400 mb-1 compact:mb-0.5">Username:</p>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg compact:px-2 compact:py-1.5 bg-slate-800 light:bg-slate-100 outline-none"
          />
          <p className="text-slate-400 mb-1 compact:mb-0.5">Password:</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg compact:px-2 compact:py-1.5 bg-slate-800 light:bg-slate-100 outline-none"
          />
          <p className="text-slate-400 mb-1 compact:mb-0.5">Role:</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as User["role"])}
            className="w-full px-4 py-3 rounded-lg compact:px-2 compact:py-1.5 bg-slate-800 light:bg-slate-100 outline-none"
          >
            <option value="User">User</option>
            <option value="Premium">Premium</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="flex gap-3 mt-6 compact:gap-1.5 compact:mt-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-lg compact:py-1.5 bg-slate-800 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={createUser}
            className="flex-1 py-3 rounded-lg compact:py-1.5 bg-green-700 hover:bg-green-600 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
