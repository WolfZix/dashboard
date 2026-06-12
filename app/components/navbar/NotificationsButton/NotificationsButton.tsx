import { Bell } from "lucide-react";
import { useState } from "react";
import Dropdown from "./Dropdown";

export default function NotificationsButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        id="notificationsButton"
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          p-2.5
          compact:p-1.5
          border
          rounded-xl
          compact:rounded-lg
          transition-all
          duration-300
          cursor-pointer
          bg-slate-800
          border-slate-700
          hover:border-slate-600
          light:bg-white
          light:border-[#e2e8f0]
          light:text-[#0f172a]
          light:hover:bg-[#f8fafc]
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
            compact:h-1.5
            compact:w-1.5
            rounded-full
            bg-green-500
          "
        />
      </button>

      {open && <Dropdown onClose={() => setOpen(false)} />}
    </div>
  );
}
