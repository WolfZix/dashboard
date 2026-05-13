import { Bell } from "lucide-react";
import { useState } from "react";

import Dropdown from "./Dropdown";

export default function NotificationsButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
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
            rounded-full
            bg-green-500
          "
        />
      </button>

      {open && <Dropdown />}
    </div>
  );
}
