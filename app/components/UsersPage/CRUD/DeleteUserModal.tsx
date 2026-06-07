import type { User } from "../users.types";
import { useEffect } from "react";

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
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  return (
    <div className="dashboard-modal-overlay" onClick={onClose}>
      <div
        className="dashboard-card rounded-2xl p-6 compact:p-3 compact:rounded-xl w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="dashboard-heading mb-3 compact:mb-1.5">Delete User</h1>
        <p className="dashboard-subtitle mb-6 compact:mb-3">
          Are you sure you want to delete{" "}
          <b className="text-white light:text-black">{user.name}</b> ?
        </p>
        <div className="flex gap-3 compact:gap-1.5">
          <button
            onClick={onClose}
            className="dashboard-button-secondary flex-1 rounded-xl compact:rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="dashboard-button-danger flex-1 rounded-xl compact:rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
