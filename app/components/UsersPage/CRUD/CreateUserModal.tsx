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
    <div className="dashboard-modal-overlay" onClick={onClose}>
      <div
        className="dashboard-card rounded-2xl p-6 compact:rounded-xl compact:p-3 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="dashboard-heading mb-6 compact:mb-3">Create User</h1>
        <div className="space-y-4 compact:space-y-2">
          <p className="dashboard-form-label">Username:</p>
          <input
            type="text"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="dashboard-input compact:px-2 compact:py-1.5 rounded-lg"
          />
          <p className="dashboard-form-label">Password:</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dashboard-input compact:px-2 compact:py-1.5 rounded-lg"
          />
          <p className="dashboard-form-label">Email:</p>
          <input
            type="text"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="dashboard-input compact:px-2 compact:py-1.5 rounded-lg"
          />
          <p className="dashboard-form-label">Role:</p>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as User["role"])}
            className="dashboard-input compact:px-2 compact:py-1.5 rounded-lg"
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
            className="dashboard-button-secondary flex-1 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={createUser}
            className="dashboard-button-success flex-1 rounded-lg"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
