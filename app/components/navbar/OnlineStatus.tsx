export default function OnlineStatus() {
  return (
    <div
      className="
        flex items-center gap-2
        px-3 py-2
        rounded-xl
        bg-slate-800
        border border-slate-700
      "
    >
      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      <span className="w-fit text-sm text-slate-300 whitespace-nowrap">
        All systems operational
      </span>
    </div>
  );
}
