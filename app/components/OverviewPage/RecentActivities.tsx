import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [canAnimate, setCanAnimate] = useState(
    localStorage.getItem("animations") === "true",
  );

  useEffect(() => {
    const syncAnimations = () => {
      setCanAnimate(localStorage.getItem("animations") === "true");
    };

    window.addEventListener("animationsChanged", syncAnimations);
    return () => {
      window.removeEventListener("animationsChanged", syncAnimations);
    };
  }, []);

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
    <div
      className="
      dashboard-card 
      rounded-2xl 
      px-6 
      py-5 
      compact:rounded-xl 
      compact:px-3 
      compact:py-2 
      compact:col-span-1
      "
    >
      <h2 className="font-semibold mb-2 text-2xl compact:mb-1 compact:text-xl select-none light:text-[#0f172a]">
        Recent activities (last 5 days)
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
          className="text-lg compact:text-base text-slate-400 light:text-[#475569] space-y-2 compact:space-y-1 select-none"
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

      <div className="mt-3 flex gap-1 compact:mt-1.5 compact:gap-0.5">
        {Array.from({ length: pages }).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setPage(i);
              resetInterval();
            }}
            className={`h-2.5 w-9.5 compact:h-1.75 cursor-pointer rounded-full transition-all duration-300 ${
              i === page
                ? "bg-[#22c55e]"
                : "bg-slate-700 light:bg-[#cbd5e1] light:hover:bg-[#b2bbc6]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
