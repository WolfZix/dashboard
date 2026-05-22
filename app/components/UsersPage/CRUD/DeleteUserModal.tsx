import type { User } from "../users.types";

type DeleteUserModalProps = {
  user: User;
  onClose: () => void;
  onDelete: () => void;
};

export default function DeleteuserModal({
  user,
  onClose,
  onDelete,
}: DeleteUserModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-999 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 light:bg-white border border-slate-700 light:border-[#e2e8f0] rounded-2xl p-6 w-96 transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-3">Delete User</h1>
        <p className="text-slate-400 mb-6">
          Are you sure you want to delete{" "}
          <b className="text-white light:text-black">{user.name}</b> ?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 light:bg-slate-100 light:hover:bg-slate-200 transition-all duration-300 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 transition-all duration-300 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
