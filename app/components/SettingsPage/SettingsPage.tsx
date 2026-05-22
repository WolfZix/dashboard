import SettingsSidebar from "./SettingsSidebar";

export default function SettingsPage() {
  return (
    <div className="flex gap-6 h-full">
      <SettingsSidebar />

      {/* Content */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Appearance */}
        <div className="rounded-4xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Appearance</h2>

            <p className="text-slate-400">
              Customize how your dashboard looks and feels.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {/* Theme */}
            <div>
              <p className="text-sm text-slate-400 mb-3">Theme</p>

              <div className="flex gap-3">
                <button className="flex-1 h-28 rounded-3xl border border-slate-700 bg-slate-800 hover:bg-slate-700 transition cursor-pointer p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-lg font-semibold">Dark</div>

                    <div className="w-3 h-3 rounded-full bg-lime-400"></div>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-950"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-800"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-700"></div>
                  </div>
                </button>

                <button className="flex-1 h-28 rounded-3xl border border-slate-800 bg-slate-950 hover:bg-slate-900 transition cursor-pointer p-4 flex flex-col justify-between">
                  <div className="text-lg font-semibold text-slate-400">
                    Light
                  </div>

                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-200"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-300"></div>
                  </div>
                </button>

                <button className="flex-1 h-28 rounded-3xl border border-slate-800 bg-slate-950 hover:bg-slate-900 transition cursor-pointer p-4 flex flex-col justify-between">
                  <div className="text-lg font-semibold text-slate-400">
                    System
                  </div>

                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-950"></div>

                    <div className="w-8 h-8 rounded-lg bg-slate-400"></div>

                    <div className="w-8 h-8 rounded-lg bg-white"></div>
                  </div>
                </button>
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <p className="text-sm text-slate-400 mb-3">Accent Color</p>

              <div className="flex flex-wrap gap-3">
                <button className="w-9 h-9 rounded-full bg-red-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-orange-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-yellow-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-lime-500 border-2 border-white scale-110 cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-cyan-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-blue-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-purple-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>

                <button className="w-9 h-9 rounded-full bg-pink-500 border-2 border-transparent hover:scale-105 transition cursor-pointer"></button>
              </div>
            </div>

            {/* UI Density */}
            <div>
              <p className="text-sm text-slate-400 mb-3">UI Density</p>

              <div className="flex gap-3">
                <button className="flex-1 py-4 rounded-2xl border border-slate-700 bg-slate-800 font-semibold transition cursor-pointer">
                  Comfortable
                </button>

                <button className="flex-1 py-4 rounded-2xl border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer">
                  Compact
                </button>
              </div>
            </div>

            {/* Animations */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Animations</h3>

                  <p className="text-sm text-slate-400">
                    Enable smooth transitions and effects.
                  </p>
                </div>

                <button className="relative w-14 h-8 rounded-full bg-lime-500 transition cursor-pointer">
                  <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="rounded-4xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Live Preview</h2>

            <p className="text-slate-400">
              Preview your current dashboard style.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-lime-500"></div>

              <div>
                <div className="text-xl font-bold">WolfeZix</div>

                <div className="text-slate-400">Admin</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                <div className="text-3xl font-bold text-lime-400 mb-1">12</div>

                <div className="text-slate-400">Projects</div>
              </div>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                <div className="text-3xl font-bold text-lime-400 mb-1">84</div>

                <div className="text-slate-400">Tasks</div>
              </div>

              <div className="rounded-2xl bg-slate-900 border border-slate-800 p-4">
                <div className="text-3xl font-bold text-lime-400 mb-1">621</div>

                <div className="text-slate-400">Commits</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
