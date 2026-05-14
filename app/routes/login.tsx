import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-600">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome back</h1>
        <p className="text-white mb-6">Sign in to your dashboard</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-slate-300 border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border text-slate-300 border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            type="submit"
            className="w-full bg-slate-900 border-2 border-slate-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
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
