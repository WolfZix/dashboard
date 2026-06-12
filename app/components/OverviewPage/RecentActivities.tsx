import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimations } from "../../context/AnimationContext";

type RecentActivitiesProps = {
  activities: string[];
};

export default function RecentActivities({
  activities,
}: RecentActivitiesProps) {
  const [page, setPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const PAGE_SIZE = 6;
  const pages = Math.ceil(activities.length / PAGE_SIZE) || 1;
  const visibleActivities = activities.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );
  const { canAnimate } = useAnimations();

  useEffect(() => {
    if (!canAnimate) return;
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pages, canAnimate]);

  const resetInterval = () => {
    if (!canAnimate) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, 5000);
  };

  return (
    <div className="dashboard-card flex flex-col justify-around xl:min-h-fit rounded-2xl py-2 md:py-5 md:px-6 col-span-1 compact:rounded-xl compact:px-3 compact:py-2 compact:col-span-1">
      <h2 className="dashboard-title text-xl text-center mb-2 md:text-left md:text-2xl compact:mb-1 compact:text-xl">
        Recent activities
      </h2>

      <AnimatePresence mode="wait">
        <motion.ul
          key={page}
          onMouseEnter={() => {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
          }}
          onMouseLeave={resetInterval}
          initial={canAnimate ? { opacity: 0, x: 10 } : false}
          animate={canAnimate ? { opacity: 1, x: 0 } : undefined}
          exit={canAnimate ? { opacity: 0, x: -10 } : undefined}
          transition={
            canAnimate
              ? {
                  duration: 0.2,
                  ease: "easeInOut",
                }
              : undefined
          }
          className="text-base text-center md:text-lg md:text-left compact:text-base dashboard-muted-text space-y-0.5 lg:space-y-2 compact:space-y-1 select-none"
        >
          {visibleActivities.map((item, i) => (
            <motion.li
              key={item + i}
              initial={canAnimate ? { opacity: 0, x: 10 } : false}
              animate={canAnimate ? { opacity: 1, x: 0 } : undefined}
              transition={canAnimate ? { delay: i * 0.1 } : undefined}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="justify-center md:justify-start mt-2 flex gap-2 md:gap-1 compact:mt-1.5 compact:gap-0.5">
        {Array.from({ length: pages }).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setPage(i);
              resetInterval();
            }}
            className={`dashboard-pagination-dot lg:h-fit compact:h-1.75 ${
              i === page
                ? "bg-[#22c55e] text-black scale-115 font-semibold"
                : "bg-slate-700 light:bg-[#cbd5e1] light:hover:bg-[#b2bbc6]"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
