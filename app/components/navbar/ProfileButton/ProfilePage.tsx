import { useParams } from "react-router-dom";
import type { User } from "../../UsersPage/users.types";
import EditProfileModal from "./EditProfileModal";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboard.server";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "./profile.helpers";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
      return;
    }
    async function loadData() {
      const result = await getDashboardData();
      setUsers(result.UsersData);
      localStorage.setItem("users", JSON.stringify(result.UsersData));
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
      <div className="animate-pulse min-h-screen transition-all duration-300">
        <div className="h-55 rounded-4xl bg-slate-800 mb-6"></div>
        <div className="grid grid-cols-4 gap-3">
          <div className="h-32 rounded-3xl bg-slate-800"></div>
          <div className="h-32 rounded-3xl bg-slate-800"></div>
          <div className="h-32 rounded-3xl bg-slate-800"></div>
          <div className="h-32 rounded-3xl bg-slate-800"></div>
        </div>
      </div>
    );
  }
  if (!user) {
    return <p>User not found :(</p>;
  }

  return (
    <div className="flex flex-col gap-6 transition-all duration-300">
      {/* Banner + Header */}
      <div
        style={
          {
            "--boxShadow": `0 0 20px ${user.color}20`,
            "--boxShadow-light": `0 0 20px ${user.color}75`,
          } as React.CSSProperties
        }
        className="relative rounded-4xl shadow-(--boxShadow) light:shadow-(--boxShadow-light) transition-all duration-300"
      >
        {/* Banner */}
        <div className="w-full h-55 rounded-[28px] bg-linear-to-br from-slate-950 to-slate-800 relative overflow-hidden transition-all duration-300">
          {user.banner ? (
            <img
              src={user.banner}
              className="w-full h-full object-cover transition-all duration-300"
            />
          ) : null}
          <div className="absolute inset-0 bg-black/85 light:bg-transparent transition-all duration-300"></div>
        </div>
        {/* Content on banner */}
        <div className="absolute inset-0 flex items-end justify-between p-8 transition-all duration-300">
          {/* Left */}
          <div className="flex items-end gap-6 transition-all duration-300">
            {/* Avatar */}
            <div
              style={
                {
                  backgroundColor: "black",
                  boxShadow: `0 0 20px ${user.color}25`,
                  "--border-color-dark": `${user.color}35`,
                  "--border-color-light": `${user.color}`,
                } as React.CSSProperties
              }
              className="relative rounded-full border transition-all duration-300 border-(--border-color-dark) light:border-(--border-color-light)"
            >
              <div
                style={{ backgroundColor: user.color }}
                className="w-32 h-32 rounded-full flex items-center justify-center text-black text-5xl font-bold select-none shadow-2xl m-1.25 transition-all duration-300"
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
              <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-lime-400 border border-slate-950 transition-all duration-300"></div>
            </div>
            {/* User info */}
            <div className="pb-2 transition-all duration-300">
              <div className="flex items-center gap-3 mb-2 transition-all duration-300">
                <h1
                  style={
                    {
                      "--text-dark": `${user.color}`,
                      "--text-light": `${user.color}`,
                    } as React.CSSProperties
                  }
                  className={`text-5xl font-bold text-(--text-dark) light:text-(--text-light) opacity-75 light:opacity-100 transition-all duration-300`}
                >
                  {user?.name}
                </h1>
                <div
                  className={`${getRoleColor(user.role)} px-4 py-1 rounded-full text-sm font-semibold text-white transition-all duration-300`}
                >
                  {user?.role}
                </div>
              </div>
              <p className="text-slate-300 mb-2 transition-all duration-300">
                {user?.bio}
              </p>
              <p className="text-sm text-slate-500 transition-all duration-300">
                {user?.joined}
              </p>
            </div>
          </div>
          {/* Right */}
          <div className="flex items-end h-full transition-all duration-300">
            <button
              onClick={() => setEditProfileOpen(true)}
              style={
                {
                  boxShadow: `0px 0px 20px ${user.color}50`,
                  "--border-color": `${user.color}90`,
                  "--text": `${user.color}`,
                  "--hover-text": `${user.color !== "#ffffff" ? "#ffffff" : "#000000"}`,
                  "--bg": `${user.color}50`,
                  "--hover-bg": `${user.color}70`,
                } as React.CSSProperties
              }
              className={`px-6 py-3 rounded-2xl transition-all duration-300 border border-(--border-color)  backdrop-blur-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]
                ${
                  user.color === "#ffffff"
                    ? "text-black light:bg-white light:hover:bg-white/80 light:opacity-100 bg-white opacity-75 hover:opacity-100"
                    : user.color === "#000000"
                      ? "text-white/75 bg-black transition-all duration-300 border-white hover:text-white hover:bg-white/5"
                      : "hover:bg-(--hover-bg) bg-(--bg) text-(--text) hover:text-(--hover-text)"
                }`}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 transition-all duration-300">
        <div className="bg-slate-900 border-slate-800 light:bg-white light:border-slate-200 border rounded-3xl p-5 transition-all duration-300">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold mb-2 transition-all duration-300 dark:text-(--text-dark) 
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
          <p className="text-slate-400 transition-all duration-300">Projects</p>
        </div>
        <div className="bg-slate-900 border-slate-800 light:bg-white light:border-slate-200 border rounded-3xl p-5 transition-all duration-300">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold mb-2 transition-all duration-300 dark:text-(--text-dark) 
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
          <p className="text-slate-400 transition-all duration-300">Reports</p>
        </div>
        <div className="bg-slate-900 border-slate-800 light:bg-white light:border-slate-200 border rounded-3xl p-5 transition-all duration-300">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold transition-all duration-300 mb-2 dark:text-(--text-dark) 
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
          <p className="text-slate-400 transition-all duration-300">Tasks</p>
        </div>
        <div className="bg-slate-900 border-slate-800 light:bg-white light:border-slate-200 border rounded-3xl p-5 transition-all duration-300">
          <h2
            style={
              {
                "--text-dark": `${user.color}90`,
                "--text-light": `${user.color}`,
              } as React.CSSProperties
            }
            className={`text-4xl font-bold transition-all duration-300 mb-2 dark:text-(--text-dark) 
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
          <p className="text-slate-400 transition-all duration-300">Commits</p>
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
        className={`bg-slate-900 light:bg-white border border-slate-800 light:border-slate-100 border-t-(--borderTop) transition-all duration-300 rounded-3xl p-2
          ${user.color === "#ffffff" ? "light:border-t-slate-300" : "light:border-t-(--borderTop-light)"}`}
      >
        <div
          style={
            {
              "--scrollbar-thumb": `${user.color}90`,
              "--scrollbar-thumb-light":
                user.color === "#ffffff" ? "#cbd5e1" : `${user.color}75`,
            } as React.CSSProperties
          }
          className=" h-62 overflow-y-auto p-3 scrollbar-thumb-(--scrollbar-thumb) light:scrollbar-thumb-(--scrollbar-thumb-light)"
        >
          <h2 className="text-2xl font-bold mb-5 transition-all duration-300">
            Recent Activity
          </h2>
          <div className="flex flex-col gap-3 transition-all duration-300">
            {(user.activity || []).map((activityItem) => (
              <div
                key={activityItem.id}
                className="flex items-center justify-between bg-slate-950/60 light:bg-slate-100 rounded-2xl px-4 py-3 transition-all duration-300"
              >
                <div className="flex items-center gap-3 transition-all duration-300">
                  <div
                    className={`w-3 h-3 transition-all duration-300 rounded-full ${getActivityColor(activityItem.type)}`}
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
        <div className="fixed bottom-5 right-5 z-999 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl min-w-80 transition-all duration-300">
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-lime-400 animate-[toast_2s_linear_forwards] transition-all duration-300"></div>

          <div className="flex items-center gap-3 px-5 py-4 transition-all duration-300">
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
