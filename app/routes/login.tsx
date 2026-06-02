import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/navbar/ThemeToggle";
import { getDashboardData } from "../services/dashboard.server";
import type { User } from "../components/UsersPage/users.types";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");

    if (username) {
      navigate("/");
    }
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!localStorage.getItem("users")) {
      const data = await getDashboardData();
      localStorage.setItem("users", JSON.stringify(data.UsersData));
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u: User) => u.name.toLowerCase() === username.toLowerCase(),
    );
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
    localStorage.setItem("username", foundUser.name);
    localStorage.setItem("mode", "comfortable");
    window.dispatchEvent(new Event("usersUpdated"));
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 light:bg-[#f1f5f9] transition-none">
      <div className="w-full relative max-w-md bg-slate-900 light:bg-white p-8 rounded-2xl shadow-lg border border-slate-600 light:border-[#e2e8f0]">
        <h1 className="text-3xl font-bold mb-2 text-white light:text-[#0f172a]">
          Welcome back
        </h1>
        <p className="text-slate-400 light:text-[#475569] mb-6">
          Sign in to your dashboard
        </p>
        <div className="absolute right-0 top-0 mt-8 mr-8 w-10 h-10 text-white light:text-[#0f172a]">
          <ThemeToggle />
        </div>

        <form className="space-y-4 light:text-[#0f172a]" onSubmit={handleLogin}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            "
          >
            Sign in
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
