import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/navbar/ThemeToggle";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 light:bg-[#f1f5f9]">
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

        <p className="text-xs text-slate-400 mt-6 text-center">
          Demo UI — no auth yet
        </p>
      </div>
    </div>
  );
}
