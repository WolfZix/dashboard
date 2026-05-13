import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import DigitalClock from "./DigitalClock";

type DailyNewsProps = {
  news: string[];
};

export default function DailyNews({ news }: DailyNewsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const [marqueeWidth, setMarqueeWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current) {
      setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, [news]);

  return (
    <AnimatePresence>
      <div
        className="
          bg-slate-900
          border border-slate-700
          rounded-2xl
          col-span-full
          min-h-35
          mt-2
          py-3
          overflow-hidden
        "
      >
        <h2 className="font-semibold text-2xl select-none mx-5 mb-2">
          <DigitalClock />
        </h2>

        <div className="overflow-hidden border-y-2 border-slate-700 mb-2">
          <motion.div
            ref={marqueeRef}
            className="flex w-max gap-3 will-change-transform"
            animate={{
              x: [0, -marqueeWidth],
            }}
            transition={{
              ease: "linear",
              duration: 400,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[...news, ...news].map((message, index) => (
              <p
                key={index}
                className="
                    text-sm
                    whitespace-nowrap
                    min-w-fit
                    pl-2
                    pr-3
                    py-5
                    text-slate-300
                  "
              >
                {message}
              </p>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
