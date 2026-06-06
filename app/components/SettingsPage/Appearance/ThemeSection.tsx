type ThemeSectionProps = {
  handleThemePreview: (theme: "dark" | "light") => void;
  previewColor: string;
  previewTheme: string;
};

export default function ThemeSection({
  handleThemePreview,
  previewColor,
  previewTheme,
}: ThemeSectionProps) {
  return (
    <div>
      <p className="dashboard-section-label mb-3 compact:mb-1.5">Theme</p>
      <div className="flex gap-3 compact:gap-1.5">
        <button
          onClick={() => handleThemePreview("dark")}
          style={
            {
              "--border-light": `${previewColor}`,
              "--border-dark": `${previewColor}55`,
              "--boxShadow": `0 0 20px ${previewColor}25`,
            } as React.CSSProperties
          }
          className={`dashboard-option-card
                ${
                  previewTheme === "dark"
                    ? "shadow-(--boxShadow) border-(--border-dark) bg-slate-800 hover:bg-slate-700 light:border-(--border-light) light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
        >
          <div className="flex justify-between items-start">
            <div className="text-lg font-semibold">Dark</div>
          </div>
          <div className="flex gap-2 compact:gap-1">
            <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 light:border-slate-400 transition-all duration-300"></div>
          </div>
        </button>
        <button
          onClick={() => handleThemePreview("light")}
          style={
            {
              "--border-light": `${previewColor}`,
              "--border-dark": `${previewColor}75`,
              "--boxShadow-light": `0 0 20px${previewColor}50`,
            } as React.CSSProperties
          }
          className={`dashboard-option-card
                ${
                  previewTheme === "light"
                    ? previewColor !== "#ffffff"
                      ? "light:shadow-(--boxShadow-light) border-(--border-dark) bg-slate-800 hover:bg-slate-700 light:border-(--border-light) light:bg-slate-200 light:hover:bg-slate-300"
                      : "light:shadow-[0px_0px_20px_#00000025] light:border-black/25 bg-slate-800 hover:bg-slate-700 light:bg-slate-200 light:hover:bg-slate-300"
                    : "border-slate-800 bg-slate-950 hover:bg-slate-800 light:border-slate-400 light:bg-slate-100 light:hover:bg-slate-200"
                }
                `}
        >
          <div className="flex justify-between items-start">
            <div className="text-lg font-semibold">Light</div>
          </div>
          <div className="flex gap-2 compact:gap-1">
            <div className="w-8 h-8 rounded-lg bg-white border border-slate-600 light:border-slate-400"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-200 border border-slate-600 light:border-slate-400"></div>
            <div className="w-8 h-8 rounded-lg bg-slate-300 border border-slate-600 light:border-slate-400"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
