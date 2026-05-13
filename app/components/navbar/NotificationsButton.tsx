import { Bell } from "lucide-react";

export default function NotificationsButton() {
  return (
    <button
      className="
        relative
        p-2.5
        border
        rounded-xl
        transition-all
        cursor-pointer
        bg-slate-800
        border-slate-700
        hover:border-slate-600

        light:bg-[white]
        light:border-[#e2e8f0]
        light:text-[#0f172a]
        light:hover:bg-[#f8fafc]
        light:hover:text-slate-950
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
