export default function UserProfile() {
  return (
    <button
      className="
        flex items-center gap-3
        px-3 py-2
        rounded-xl
        bg-slate-800
        border border-slate-700
        hover:border-slate-600
        transition-all
      "
    >
      <div
        className="
          h-8
          w-8
          rounded-full
          bg-green-500
          flex
          items-center
          justify-center
          text-black
          font-bold
          text-sm
        "
      >
        W
      </div>

      <div className="text-left">
        <p className="text-sm font-medium">WolfZix</p>

        <p className="text-xs text-slate-400">Admin</p>
      </div>
    </button>
  );
}
