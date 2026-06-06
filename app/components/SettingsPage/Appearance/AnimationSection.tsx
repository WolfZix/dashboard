type AnimationSectionProps = {
  handleAnimationsPreview: () => void;
  canAnimate: boolean;
};

export default function AnimationSection({
  handleAnimationsPreview,
  canAnimate,
}: AnimationSectionProps) {
  return (
    <div>
      <div className="flex items-end gap-5">
        <div>
          <h3 className="dashboard-section-title mb-0.5 compact:mb-0">
            Animations
          </h3>
          <p className="dashboard-section-label">
            Enable smooth transitions and effects.
          </p>
        </div>
        <button
          onClick={handleAnimationsPreview}
          className={`
              relative
              w-14
              h-8
              rounded-full
              cursor-pointer
              ${canAnimate ? "bg-lime-500" : "bg-gray-400"}
            `}
        >
          <div
            className={`
                absolute
                top-1
                right-1
                w-6
                h-6
                rounded-full
                bg-white
                transition-all
                duration-300
                ${canAnimate ? "translate-x-0" : "-translate-x-6"}
              `}
          ></div>
        </button>
      </div>
    </div>
  );
}
