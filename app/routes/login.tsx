import { Form } from "react-router";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-600">
        <h1 className="text-3xl font-bold mb-2 text-white">Welcome back</h1>
        <p className="text-white mb-6">Sign in to your dashboard</p>

        <Form method="post" className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          <button
            type="submit"
            className="w-full bg-slate-900 border-2 border-slate-600 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Sign in
          </button>
        </Form>

        <p className="text-xs text-slate-400 mt-6 text-center">
          Demo UI — no auth yet
        </p>
      </div>
    </div>
  );
}
