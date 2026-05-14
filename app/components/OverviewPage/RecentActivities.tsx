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

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pages]);

  const resetInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % pages);
    }, 5000);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 light:bg-[white] light:border-[#e2e8f0] light:shadow-[0_1px_3px_rgba(0,0,0,0.1)] light:hover:bg-[#f8fafc] rounded-2xl px-6 py-5">
      <h2 className="font-semibold mb-2 text-2xl select-none light:text-[#0f172a]">
        Recent activities (last 5 days)
      </h2>

      <AnimatePresence mode="wait">
        <motion.ul
          key={page}
          onMouseEnter={() => clearInterval(intervalRef.current!)}
          onMouseLeave={resetInterval}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="text-lg text-slate-400 light:text-[#475569] space-y-2 select-none"
        >
          {visibleActivities.map((item, i) => (
            <motion.li
              key={item + i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="mt-3 flex gap-1">
        {Array.from({ length: pages }).map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setPage(i);
              resetInterval();
            }}
            className={`h-2.5 w-9.5 cursor-pointer rounded-full transition-all duration-300 ${
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
