type DensitySectionProps = {
  previewMode: string;
  handleModePreview: (mode: "comfortable" | "compact") => void;
};

export default function DensitySection({
  previewMode,
  handleModePreview,
}: DensitySectionProps) {
  return (
    <div>
      <p className="dashboard-section-label mb-2 compact:mb-1">UI Density</p>
      <div className="flex gap-3 compact:gap-1.5">
        <button
          style={
            {
              "--bg-dark":
                previewMode === "comfortable" ? "#1d293d" : "#020618",
              "--bg-light":
                previewMode === "comfortable" ? "#e2e8f0" : "f1f5f9",
              "--text-dark":
                previewMode === "comfortable" ? "#ffffff" : "#ffffff50",
              "--text-light":
                previewMode === "comfortable" ? "#000000" : "#00000075",
              "--border-dark":
                previewMode === "comfortable" ? "#45556c" : "#45556c50",
              "--border-light":
                previewMode === "comfortable" ? "#d1d5db" : "#d1d5db",
            } as React.CSSProperties
          }
          onClick={() => handleModePreview("comfortable")}
          className="
              dashboard-density-button
              text-(--text-dark)
              light:text-(--text-light)
              border-(--border-dark)
              bg-(--bg-dark)
              hover:bg-slate-700
              light:border-(--border-light)
              light:bg-(--bg-light)
              light:hover:bg-slate-100
            "
        >
          Comfortable
        </button>
        <button
          style={
            {
              "--bg-dark": previewMode === "compact" ? "#1d293d" : "#020618",
              "--bg-light": previewMode === "compact" ? "#e2e8f0" : "f1f5f9",
              "--text-dark":
                previewMode === "compact" ? "#ffffff" : "#ffffff50",
              "--text-light":
                previewMode === "compact" ? "#000000" : "#00000075",
              "--border-dark":
                previewMode === "compact" ? "#45556c" : "#45556c50",
              "--border-light":
                previewMode === "compact" ? "#d1d5db" : "#d1d5db",
            } as React.CSSProperties
          }
          onClick={() => handleModePreview("compact")}
          className="
              dashboard-density-button
              text-(--text-dark)
              light:text-(--text-light)
              border-(--border-dark)
              bg-(--bg-dark)
              hover:bg-slate-700
              light:border-(--border-light)
              light:bg-(--bg-light)
              light:hover:bg-slate-100
            "
        >
          Compact
        </button>
      </div>
    </div>
  );
}
