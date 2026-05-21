import { useParams } from "react-router-dom";
import type { User } from "../../UsersPage/users.types";
import EditProfileModal from "./EditProfileModal";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboard.server";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "./profile.helpers";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const user = users?.find(
    (u: User) => u.name.toLowerCase() === username?.toLowerCase(),
  );
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
      return;
    }
    async function loadData() {
      const result = await getDashboardData();
      setUsers(result.UsersData);
      localStorage.setItem("users", JSON.stringify(result.UsersData));
    }
    loadData();
  }, []);

  function getRoleColor(role: string) {
    return role === "Admin"
      ? "bg-red-500"
      : role === "Moderator"
        ? "bg-orange-500"
        : role === "Premium"
          ? "bg-purple-500"
          : "bg-slate-500";
  }

  function getActivityColor(type: string) {
    return type === "profile_picture"
      ? "bg-amber-400"
      : type === "banner"
        ? "bg-yellow-300"
        : type === "username"
          ? "bg-orange-500"
          : type === "bio"
            ? "bg-lime-300"
            : type === "profile_color"
              ? "bg-green-500"
              : type === "password"
                ? "bg-red-500"
                : "bg-teal-400";
  }

  if (!user) {
    return <p>User not found :(</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Banner + Header */}
      <div
        style={{ boxShadow: `0 0 20px ${user.color}20` }}
        className="relative rounded-4xl transition-all duration-300"
      >
        {/* Banner */}
        <div className="w-full h-55 rounded-[28px] bg-linear-to-br from-slate-950 to-slate-800 relative overflow-hidden">
          {user.banner ? (
            <img src={user.banner} className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-black/85"></div>
        </div>
        {/* Content on banner */}
        <div className="absolute inset-0 flex items-end justify-between p-8">
          {/* Left */}
          <div className="flex items-end gap-6">
            {/* Avatar */}
            <div
              style={{
                backgroundColor: "black",
                borderColor: `${user.color}35`,
                boxShadow: `0 0 20px ${user.color}25`,
              }}
              className="relative rounded-full border transition-all duration-300"
            >
              <div
                style={{ backgroundColor: user.color }}
                className="w-32 h-32 rounded-full flex items-center justify-center text-black text-5xl font-bold select-none shadow-2xl m-1.25"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-full h-full object-cover rounded-full scale-[1.01]"
                  />
                ) : (
                  user?.name[0].toUpperCase()
                )}
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-lime-400 border-4 border-slate-950"></div>
            </div>
            {/* User info */}
            <div className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-5xl font-bold">{user?.name}</h1>
                <div
                  className={`${getRoleColor(user.role)} px-4 py-1 rounded-full text-sm font-semibold`}
                >
                  {user?.role}
                </div>
              </div>
              <p className="text-slate-300 mb-2">{user?.bio}</p>
              <p className="text-sm text-slate-500">{user?.joined}</p>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-end h-full">
            <button
              onClick={() => setEditProfileOpen(true)}
              style={
                {
                  boxShadow: `0px 0px 20px ${user.color}50`,
                  "--border-color": `${user.color}90`,
                  "--text": `${user.color}60`,
                  "--hover-text": `${user.color}`,
                  "--bg": `${user.color}20`,
                  "--hover-bg": `${user.color}70`,
                } as React.CSSProperties
              }
              className={`px-6 py-3 rounded-2xl  border border-(--border-color)  backdrop-blur-md transition-all duration-300 cursor-pointer hover:bg-(--hover-bg) bg-(--bg) text-(--text) hover:text-(--hover-text) hover:scale-[1.02] active:scale-[0.98]
                ${
                  user.color === "#ffffff"
                    ? "text-black bg-white/50 hover:text-black hover:bg-white"
                    : user.color === "#000000"
                      ? "text-white/75 bg-black transition-all duration-300 border-white hover:text-white hover:bg-white/5"
                      : ""
                }`}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h2
            style={{ color: `${user.color}90` }}
            className="text-4xl font-bold mb-2"
          >
            {user?.projects}
          </h2>
          <p className="text-slate-400">Projects</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h2
            style={{ color: `${user.color}90` }}
            className="text-4xl font-bold mb-2"
          >
            {user?.reports}
          </h2>
          <p className="text-slate-400">Reports</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h2
            style={{ color: `${user.color}90` }}
            className="text-4xl font-bold mb-2"
          >
            {user?.tasks}
          </h2>
          <p className="text-slate-400">Tasks</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5">
          <h2
            style={{ color: `${user.color}90` }}
            className="text-4xl font-bold mb-2"
          >
            {user?.commits}
          </h2>
          <p className="text-slate-400">Commits</p>
        </div>
      </div>
      {/* Activity */}
      <div
        style={{ borderTopColor: `${user.color}90` }}
        className="bg-slate-900 border border-slate-800 rounded-3xl p-2"
      >
        <div className="h-62 overflow-y-auto p-3 scrollbar-thumb-slate-700">
          <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {(user.activity || []).map((activityItem) => (
              <div
                key={activityItem.id}
                className="flex items-center justify-between bg-slate-950/60 rounded-2xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${getActivityColor(activityItem.type)}`}
                  ></div>
                  <div className="text-slate-300">{activityItem.message}</div>
                </div>
                <div className="text-xs text-slate-500">
                  {formatTimeAgo(activityItem.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-5 right-5 z-999 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl min-w-80">
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-lime-400 animate-[toast_2s_linear_forwards]"></div>

          <div className="flex items-center gap-3 px-5 py-4">
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

              <p className="text-sm text-slate-400">{toast.message}</p>
            </div>
          </div>
        </div>
      )}
      {editProfileOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setEditProfileOpen(false)}
          onSave={(updatedUser) => {
            const updatedUsers = users.map((u) => {
              if (u.id === updatedUser.id) {
                return updatedUser;
              }
              return u;
            });
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setUsers(updatedUsers);
            if (updatedUser.name !== user.name) {
              localStorage.setItem("username", updatedUser.name);
              navigate(`/profile/${updatedUser.name}`);
            }
            window.dispatchEvent(new Event("usersUpdated"));
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            setToast({ type: "success", message: "User updated successfully" });
            setTimeout(() => {
              setToast(null);
            }, 2000);
          }}
        />
      )}
    </div>
  );
}
