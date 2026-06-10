import { useParams } from "react-router-dom";
import type { User } from "../../UsersPage/users.types";
import EditProfileModal from "./EditProfileModal";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboard.server";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "./profile.helpers";
import {
  saveUsers,
  getUsers,
  getUserByName,
} from "../../../services/userService";
import { setUsername } from "../../../services/authService";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const users = getUsers();
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const user = username ? getUserByName(username) : null;
  const [editProfileOpen, setEditProfileOpen] = useState(false);

  useEffect(() => {
    const users = getUsers();
    if (users.length > 0) {
      setLoading(false);
      return;
    }
    async function loadData() {
      const result = await getDashboardData();
      saveUsers(result.usersData);
      setLoading(false);
    }
    loadData();
  }, []);

  function getRoleColor(role: string) {
    return role === "Admin"
      ? "dark:bg-red-900 light:bg-red-500"
      : role === "Moderator"
        ? "dark:bg-orange-900 light:bg-orange-500"
        : role === "Premium"
          ? "dark:bg-purple-900 light:bg-purple-500"
          : "dark:bg-slate-900 light:bg-slate-500";
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

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-55 rounded-4xl bg-slate-900 light:bg-white mb-6"></div>
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="h-29 p-4 rounded-3xl bg-slate-900 border-slate-800 light:bg-white light:border-slate-200"></div>
          <div className="h-29 p-4 rounded-3xl bg-slate-900 border-slate-800 light:bg-white light:border-slate-200"></div>
          <div className="h-29 p-4 rounded-3xl bg-slate-900 border-slate-800 light:bg-white light:border-slate-200"></div>
          <div className="h-29 p-4 rounded-3xl bg-slate-900 border-slate-800 light:bg-white light:border-slate-200"></div>
        </div>
        <div className="h-55 rounded-4xl bg-slate-900 border-none light:bg-white mb-6"></div>
      </div>
    );
  }
  if (!user) {
    return <p>User not found :(</p>;
  }

  return (
    <div className="flex flex-col gap-6 compact:gap-3">
      {/* Banner + Header */}
      <div
        style={
          {
            "--boxShadow": `0 0 20px ${user.color}20`,
            "--boxShadow-light": `0 0 20px ${user.color}75`,
          } as React.CSSProperties
        }
        className="relative rounded-4xl compact:rounded-2xl shadow-(--boxShadow) light:shadow-(--boxShadow-light)"
      >
        {/* Banner */}
        <div className="w-full h-55 rounded-[28px] compact:rounded-[14px] bg-linear-to-br from-slate-950 to-slate-800 relative overflow-hidden">
          {user.banner ? (
            <img src={user.banner} className="w-full h-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-black/85 light:bg-transparent transition-all duration-300"></div>
        </div>
        {/* Content on banner */}
        <div className="absolute inset-0 flex items-end justify-between p-8 compact:p-4 transition-all duration-300">
          {/* Left */}
          <div className="flex items-end gap-6 compact:gap-3 transition-all duration-300">
            {/* Avatar */}
            <div
              style={
                {
                  backgroundColor: "black",
                  boxShadow: `0 0 20px ${user.color}25`,
                  "--border-color": `${user.color}`,
                } as React.CSSProperties
              }
              className="relative rounded-full border transition-all duration-300 border-(--border-color)"
            >
              <div
                style={{ backgroundColor: user.color }}
                className="w-32 h-32 rounded-full flex items-center justify-center text-black text-5xl font-bold select-none shadow-2xl m-1.25 compact:m-0.5 transition-all duration-300"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-full h-full object-cover rounded-full scale-[1.01] transition-all duration-300"
                  />
                ) : (
                  user?.name[0].toUpperCase()
                )}
              </div>
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-lime-400 border border-slate-950"></div>
            </div>
            {/* User info */}
            <div className="pb-2 compact:pb-1">
              <div className="flex items-center gap-3 mb-2 compact:gap-1.5 compact:mb-1">
                <h1
                  style={
                    {
                      "--text-dark": `${user.color}`,
                      "--text-light": `${user.color}`,
                    } as React.CSSProperties
                  }
                  className={`text-5xl font-bold transition-all duration-300 text-(--text-dark) light:text-(--text-light) opacity-75 light:opacity-100 text-shadow-none light:text-shadow-[0_0_5px_rgb(0,0,0)]`}
                >
                  {user?.name}
                </h1>
                <div
                  className={`${getRoleColor(user.role)} px-4 py-1 compact:px-2 compact:py-0.5 rounded-full text-sm font-semibold text-white`}
                >
                  {user?.role}
                </div>
              </div>
              {user.bio && (
                <p
                  style={
                    {
                      "--bg": `${user.color}50`,
                    } as React.CSSProperties
                  }
                  className="bg-(--bg) backdrop-blur-xs rounded-full w-fit px-3 py-1 text-white light:text-shadow-[0_0_5px_rgb(0,0,0)] mb-2 compact:mb-1"
                >
                  {user?.bio}
                </p>
              )}
              <p className="text-sm text-slate-500 light:text-shadow-[0_0_5px_rgb(0,0,0)]">
                Joined: {user?.joined}
              </p>
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
                  "--bg": `${user.color}50`,
                  "--hover-bg": `${user.color}70`,
                } as React.CSSProperties
              }
              className={`
              dashboard-button-edit-profile
              border-(--border-color)
              bg-(--bg)
              hover:bg-(--hover-bg)
              hover:text-white
              ${user.color === "#000000" ? "text-shadow-none light:text-shadow-none" : "text-shadow-none light:text-shadow-[0_0_5px_rgb(0,0,0)]"}
              `}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 compact:gap-1.5">
        <div className="dashboard-card rounded-3xl p-5 compact:rounded-2xl compact:p-2.5">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold mb-2 compact:mb-1 transition-all duration-300 dark:text-(--text-dark) 
              ${
                user.color === "#ffffff"
                  ? "light:text-slate-400"
                  : user.color === "#f0b100"
                    ? "light:text-yellow-400"
                    : user.color === "#000000"
                      ? "dark:text-black"
                      : user.color === "#62748e"
                        ? "light:text-slate-700"
                        : ""
              }
                `}
          >
            {user?.projects}
          </h2>
          <p className="text-slate-400">Projects</p>
        </div>
        <div className="dashboard-card rounded-3xl p-5 compact:rounded-2xl compact:p-2.5">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold mb-2 compact:mb-1 transition-all duration-300 dark:text-(--text-dark) 
              ${
                user.color === "#ffffff"
                  ? "light:text-slate-400"
                  : user.color === "#f0b100"
                    ? "light:text-yellow-400"
                    : user.color === "#000000"
                      ? "dark:text-black"
                      : user.color === "#62748e"
                        ? "light:text-slate-700"
                        : ""
              }
                `}
          >
            {user?.reports}
          </h2>
          <p className="text-slate-400">Reports</p>
        </div>
        <div className="dashboard-card rounded-3xl p-5 compact:rounded-2xl compact:p-2.5">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold transition-all duration-300 mb-2 compact:mb-1 dark:text-(--text-dark) 
              ${
                user.color === "#ffffff"
                  ? "light:text-slate-400"
                  : user.color === "#f0b100"
                    ? "light:text-yellow-400"
                    : user.color === "#000000"
                      ? "dark:text-black"
                      : user.color === "#62748e"
                        ? "light:text-slate-700"
                        : ""
              }
                `}
          >
            {user?.tasks}
          </h2>
          <p className="text-slate-400">Tasks</p>
        </div>
        <div className="dashboard-card rounded-3xl p-5 compact:rounded-2xl compact:p-2.5">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold transition-all duration-300 mb-2 compact:mb-1 dark:text-(--text-dark) 
              ${
                user.color === "#ffffff"
                  ? "light:text-slate-400"
                  : user.color === "#f0b100"
                    ? "light:text-yellow-400"
                    : user.color === "#000000"
                      ? "dark:text-black"
                      : user.color === "#62748e"
                        ? "light:text-slate-700"
                        : ""
              }
                `}
          >
            {user?.commits}
          </h2>
          <p className="text-slate-400">Commits</p>
        </div>
      </div>
      {/* Activity */}
      <div
        style={
          {
            "--borderTop": `${user.color}`,
            "--borderTop-light": `${user.color}75`,
          } as React.CSSProperties
        }
        className={`bg-slate-900 light:bg-white border border-slate-800 light:border-slate-100 border-t-(--borderTop) transition-colors duration-300 rounded-3xl p-2 compact:rounded-2xl compact:p-1
          ${user.color === "#ffffff" ? "light:border-t-slate-300" : "light:border-slate-100 light:border-t-(--borderTop-light)"}`}
      >
        <div
          style={
            {
              "--scrollbar-thumb": `${user.color}90`,
              "--scrollbar-thumb-light":
                user.color === "#ffffff" ? "#cbd5e1" : `${user.color}75`,
            } as React.CSSProperties
          }
          className=" h-62 overflow-y-auto p-3 compact:p-1.5 scrollbar-thumb-(--scrollbar-thumb) light:scrollbar-thumb-(--scrollbar-thumb-light) transition-colors duration-300"
        >
          <h2 className="text-2xl font-bold mb-5 compact:mb-2.5 transition-all duration-300">
            Recent Activity
          </h2>
          <div className="flex flex-col gap-3 compact:gap-1.5">
            {(user.activity || []).map((activityItem) => (
              <div
                key={activityItem.id}
                className="flex items-center justify-between bg-slate-950/60 light:bg-slate-100 rounded-2xl px-4 py-3 compact:rounded-xl compact:px-2 compact:py-1.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3 compact:gap-1.5">
                  <div
                    className={`w-3 h-3 rounded-full ${getActivityColor(activityItem.type)}`}
                  ></div>
                  <div className="text-slate-300 light:text-slate-950 transition-all duration-300">
                    {activityItem.message}
                  </div>
                </div>
                <div className="text-xs text-slate-500 transition-all duration-300">
                  {formatTimeAgo(activityItem.date)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && (
        <div className="fixed bottom-5 right-5 z-999 overflow-hidden rounded-2xl compact:rounded-xl border border-slate-700 light:border-slate-400 bg-slate-900 light:bg-slate-200 shadow-2xl min-w-80 transition-all duration-300">
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
            saveUsers(updatedUsers);
            if (updatedUser.name !== user.name) {
              setUsername(updatedUser.name);
              navigate(`/profile/${updatedUser.name}`);
            }
            window.dispatchEvent(new Event("usersUpdated"));
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
