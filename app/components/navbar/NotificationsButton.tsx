import { Bell } from "lucide-react";

export default function NotificationsButton() {
  return (
    <button
      className="
        relative
        p-2.5
        rounded-xl
        bg-slate-800
        border border-slate-700
        hover:border-slate-600
        transition-all
      "
    >
      <Bell size={20} />

      <span
        className="
          absolute
          top-1.5
          right-1.5
          h-2
          w-2
          rounded-full
          bg-green-500
        "
      />
    </button>
  );
}
