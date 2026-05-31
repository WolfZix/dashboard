export default function OnlineStatus() {
  return (
    <div
      className="
        flex items-center gap-2
        compact:gap-1
        px-3 py-2
        compact:px-1.5
        rounded-xl
        compact:rounded-lg
        bg-slate-800
        border border-slate-700
        light:bg-[white]
        light:border-[#e2e8f0]
        transition-all
        duration-300
      "
    >
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="w-fit text-sm text-slate-300 light:text-slate-950 whitespace-nowrap transition-all duration-300">
        All systems operational
      </span>
    </div>
  );
}
