import type { User } from "../../UsersPage/users.types";

type AccentColorSectionProps = {
  user: User | null;
  colors: string[];
  previewColor: string;
  handleUserColorChange: (color: string) => void;
};

export default function AccentColorSection({
  user,
  colors,
  handleUserColorChange,
  previewColor,
}: AccentColorSectionProps) {
  return (
    <div>
      <p className="dashboard-section-label mb-3 compact:mb-1.5">
        Accent Color
      </p>
      {!user && <div className="min-h-7"></div>}
      {user && (
        <div className="flex flex-wrap gap-3 compact:gap-1.5">
          {colors.map((buttonColor) => (
            <button
              key={buttonColor}
              onClick={() => handleUserColorChange(buttonColor)}
              style={{ "--bg": buttonColor } as React.CSSProperties}
              className={`dashboard-color-picker bg-(--bg)
                    ${
                      previewColor === buttonColor
                        ? buttonColor === "#ffffff"
                          ? `scale-105 border-white dark:shadow-[inset_0_0_0_2px_rgb(0,0,0)] light:border-black light:shadow-[inset_0_0_0_1px_rgb(0,0,0)]`
                          : buttonColor === "#000000"
                            ? `scale-105 border-white light:border-black light:shadow-[inset_0_0_0_2px_rgb(255,255,255)] dark:shadow-[inset_0_0_0_1px_rgb(255,255,255)]`
                            : `scale-110 border-white light:border-black light:shadow-[inset_0_0_0_1px_rgb(0,0,0)] dark:shadow-[inset_0_0_0_1px_rgb(255,255,255)]`
                        : buttonColor === "#ffffff"
                          ? `border-transparent light:border-black light:scale-105 hover:scale-105`
                          : buttonColor === "#000000"
                            ? `dark:border-white light:border-black scale-105 hover:scale-110`
                            : `border-transparent hover:scale-105`
                    }`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}
