import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <button
      className="
        p-2.5
        rounded-xl
        bg-slate-800
        border border-slate-700
        hover:border-slate-600
        transition-all
      "
    >
      <Moon size={20} />
    </button>
  );
}
