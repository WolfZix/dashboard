import type { User } from "./users.types";

type UserModalProps = {
  user: User;
  onClose: () => void;
};

export default function UserModal({ user, onClose }: UserModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 light:bg-white border border-slate-700 light:border-[#e2e8f0] rounded-2xl p-6 w-112.5"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-6">User Details</h1>
        <div className="space-y-4">
          <div>
            <p className="text-slate-400">Username</p>
            <h2 className="text-lg">{user.name}</h2>
          </div>
          <div>
            <p className="text-slate-400">Role</p>
            <h2 className="text-lg">{user.role}</h2>
          </div>
          <div>
            <p className="text-slate-400">Status</p>
            <h2 className="text-lg">{user.status}</h2>
          </div>
          <div>
            <p className="text-slate-400">Joined</p>
            <h2 className="text-lg">{user.joined}</h2>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
