import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/navbar/ThemeToggle";
import { getDashboardData } from "../services/dashboard.server";
import type { User } from "../components/UsersPage/users.types";
import {
  saveUsers,
  getUsers,
  getUserByName,
  createUser,
} from "../services/userService";
import { getUsername, setUsername } from "../services/authService";
import { Info } from "lucide-react";

export default function LoginPage() {
  const [currentUsername, setCurrentUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAccounts, setShowAccounts] = useState(false);
  const navigate = useNavigate();

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const time = new Date();
  const days = time.getDate();
  const months = time.getMonth() + 1;
  const years = time.getFullYear();

  function padZero(number: number) {
    return number < 10 ? `0${number}` : `${number}`;
  }

  const date = `${years}-${padZero(months)}-${padZero(days)}`;

  const guestUser: User = {
    id: 0,
    name: "Guest",
    email: "Guest@gmail.com",
    password: "",
    role: "Guest",
    status: "Online",
    joined: date,
    bio: "",
    projects: 0,
    reports: 0,
    tasks: 0,
    commits: 0,
    color: "#22c55e",
    textColor: "#000000",
    activity: [],
  };

  useEffect(() => {
    const username = getUsername();

    if (username) {
      navigate("/");
    }
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    let users = getUsers();
    if (users.length === 0) {
      const data = await getDashboardData();
      saveUsers(data.usersData);
      users = getUsers();
    }
    const foundUser = currentUsername ? getUserByName(currentUsername) : null;
    if (!foundUser) {
      setToast({ type: "error", message: "User does not exist" });
      setTimeout(() => {
        setToast(null);
      }, 2000);
      return;
    }
    if (foundUser.password !== password) {
      setToast({ type: "error", message: "Incorrect password" });
      setTimeout(() => {
        setToast(null);
      }, 2000);
      return;
    }

    setUsername(foundUser.name);
    localStorage.setItem("mode", "comfortable");
    window.dispatchEvent(new Event("usersUpdated"));
    navigate("/");
  }

  async function handleGuestLogin() {
    let users = getUsers();
    if (users.length === 0) {
      const data = await getDashboardData();
      saveUsers(data.usersData);
      users = getUsers();
    }
    const guestExists = users.some((u: User) => u.name === "Guest");
    if (!guestExists) {
      createUser(guestUser);
    }
    setUsername("Guest");
    localStorage.setItem("mode", "comfortable");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 light:bg-[#f1f5f9] transition-all duration-300">
      <div className="w-full relative max-w-md bg-slate-900 light:bg-white p-8 rounded-2xl shadow-lg border border-slate-600 light:border-[#e2e8f0] transition-all duration-300">
        <h1 className="text-3xl font-bold mb-2 text-white light:text-[#0f172a] transition-all duration-300">
          Welcome!
        </h1>

        <div className="mb-6">
          <div className="flex items-center gap-1 text-slate-400 light:text-[#475569]">
            <p>Sign in to see your dashboard</p>

            <button
              onClick={() => setShowAccounts(!showAccounts)}
              className="
                cursor-pointer
                hover:text-white
                light:hover:text-slate-900
                transition-colors
              "
            >
              <Info size={16} />
            </button>
          </div>

          {showAccounts && (
            <div
              className="
                mt-3
                rounded-xl
                border
                border-slate-700
                light:border-slate-200
                p-4
                text-sm
              "
            >
              <div className="flex justify-between">
              <h3 className="font-semibold mb-3 text-white light:text-slate-900">
                Test Account's Role
              </h3>
              <h3 className="font-semibold mb-3 text-white light:text-slate-900">
                Username
              </h3>
              </div>

              <div className="space-y-2 text-slate-400">
                <div className="flex justify-between">
                  <span>Admin</span>
                  <span className="font-medium">WolfeZix</span>
                </div>

                <div className="flex justify-between">
                  <span>Moderator</span>
                  <span className="font-medium">NovaByte</span>
                </div>

                <div className="flex justify-between">
                  <span>Premium</span>
                  <span className="font-medium">PixelCrafter</span>
                </div>

                <div className="flex justify-between">
                  <span>User</span>
                  <span className="font-medium">ShadowSync</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-700 light:border-slate-300">
                <p className="text-xs text-slate-500">
                  Password: leave empty
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute right-0 top-0 mt-8 mr-8 w-10 h-10 text-white light:text-[#0f172a]">
          <ThemeToggle />
        </div>

        <form
          className="space-y-4 light:text-[#0f172a] transition-all duration-300"
          onSubmit={handleLogin}
        >
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={currentUsername}
            onChange={(e) => setCurrentUsername(e.target.value)}
            spellCheck={false}
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            text-slate-300
            light:text-[#0f172a]
            border-slate-600
            light:border-[#e2e8f0]
            light:placeholder-slate-400
            placeholder-slate-500
            focus:outline-none
            focus:ring-2
            focus:ring-slate-500
            transition-all
            duration-300
            "
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            text-slate-300
            light:text-[#0f172a]
            border-slate-600
            light:border-[#e2e8f0]
            light:placeholder-slate-400
            placeholder-slate-500
            focus:outline-none
            focus:ring-2
            focus:ring-slate-500
            transition-all
            duration-300
            "
          />

          <button
            type="submit"
            className="w-full
            bg-slate-900
            light:bg-white
            border-2
            border-slate-600
            light:border-slate-400
            text-white
            light:text-[#0f172a]
            py-3
            rounded-xl
            font-medium
            hover:bg-slate-800
            light:hover:bg-slate-200
            cursor-pointer
            transition-all
            duration-300
            "
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full
            bg-slate-900
            light:bg-white
            border-2
            border-slate-600
            light:border-slate-400
            text-white
            light:text-[#0f172a]
            py-3
            rounded-xl
            font-medium
            hover:bg-slate-800
            light:hover:bg-slate-200
            cursor-pointer
            transition-all
            duration-300
            "
          >
            Continue as Guest
          </button>
        </form>
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
              <p className="font-semibold transition-all duration-300 text-white">
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
