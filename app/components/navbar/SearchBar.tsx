import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        placeholder="Search..."
        className="
          bg-slate-800
          border border-slate-700
          rounded-xl
          pl-10
          pr-4
          py-2
          text-sm
          text-white
          outline-none
          transition-all
          focus:border-green-500
          focus:ring-2
          focus:ring-green-500/20
          placeholder:text-slate-500
        "
      />
    </div>
  );
}
