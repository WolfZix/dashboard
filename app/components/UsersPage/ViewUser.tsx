export default function ViewUser() {
  return (
    <div
      className="
            absolute
            top-14
            right-0
            w-96
            max-h-125
            overflow-y-auto
            rounded-2xl
            border
            scrollbar-thumb-[white]
            light:scrollbar-thumb-slate-200
            backdrop-blur-xl
            border-slate-700
            light:bg-[#f8fafc]
            light:border-[#e2e8f0]
            shadow-2xl
            z-50
          "
    >
      <div className="p-4 border-b border-slate-700 light:border-[#e2e8f0]">
        <h2 className="font-semibold text-lg">Notifications</h2>
      </div>
    </div>
  );
}
