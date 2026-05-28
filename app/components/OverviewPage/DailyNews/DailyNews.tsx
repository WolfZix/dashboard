import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DigitalClock from "./DigitalClock";
import { ArrowLeft, ArrowRight } from "lucide-react";

type DailyNewsProps = {
  news: string[];
};

export default function DailyNews({ news }: DailyNewsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [page, setPage] = useState(0);
  const [flashDirection, setFlashDirection] = useState<"left" | "right" | null>(
    null,
  );

  useEffect(() => {
    if (marqueeRef.current) {
      setMarqueeWidth(marqueeRef.current.scrollWidth / 2);
    }
  }, [news]);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % news.length);

      setFlashDirection("right");
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [news.length]);

  useEffect(() => {
    if (!flashDirection) return;

    const timeout = setTimeout(() => {
      setFlashDirection(null);
    }, 500);

    return () => clearTimeout(timeout);
  }, [flashDirection]);

  function resetInterval() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % news.length);

      setFlashDirection("right");
    }, 5000);
  }

  return (
    <>
      {localStorage.getItem("mode") !== "compact" && (
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
              compact:mt-0
              compact:py-1.5
              compact:min-h-[100%]
              compact:col-span-1
              compact:hidden
              overflow-hidden
              light:bg-[white]
              light:border-[#e2e8f0]
              light:hover:bg-[#f8fafc]
              light:shadow-[0_1px_3px_rgba(0,0,0,0.1)]
              transition-all
              duration-300
            "
          >
            <h2
              className="
                font-semibold
                text-2xl
                select-none
                mx-5
                mb-2
                compact:mx-2.5
                compact:mb-1
                compact:text-xl
                transition-all
                duration-300
              "
            >
              <DigitalClock />
            </h2>

            <div
              className="
                overflow-hidden
                border-y-2
                border-slate-700
                light:border-[#e2e8f0]
                mb-2
                compact:mb-1
                transition-all
                duration-300
              "
            >
              <motion.div
                ref={marqueeRef}
                className="
                  flex
                  w-max
                  gap-3
                  compact:gap-1.5
                  will-change-transform
                "
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
                        compact:pl-1
                        compact:pr-1.5
                        compact:py-2.5
                        text-slate-300
                        light:text-[#475569]
                        transition-all
                        duration-300
                      "
                  >
                    {message}
                  </p>
                ))}
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      )}

      {localStorage.getItem("mode") === "compact" && (
        <div
          className="
            bg-slate-900
            border border-slate-700
            rounded-2xl
            mt-0
            py-1.5
            min-h-full
            col-span-1
            overflow-hidden
            light:bg-[white]
            light:border-[#e2e8f0]
            light:hover:bg-[#f8fafc]
            light:shadow-[0_1px_3px_rgba(0,0,0,0.1)]
            transition-all
            duration-300
            flex
            flex-col
          "
        >
          <h2
            className="
              font-semibold
              select-none
              mx-2.5
              mb-2
              text-xl
              transition-all
              duration-300
            "
          >
            <DigitalClock />
          </h2>
          <div
            className="
              flex-1
              overflow-hidden
              border-y-2
              border-slate-700
              light:border-[#e2e8f0]
              transition-all
              duration-300
            "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{
                  opacity: 0,
                  x: 10,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -10,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="
                  flex
                  items-center
                  h-full
                  px-4
                  py-4
                  compact:px-2
                  compact:py-2
                  text-base
                  text-slate-300
                  light:text-[#475569]
                  select-none
                "
              >
                {news[page]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className="
              mt-3
              flex
              items-center
              justify-around
              px-4
              compact:px-2
            "
          >
            <button
              onClick={() => {
                setPage((prev) => (prev === 0 ? news.length - 1 : prev - 1));
                resetInterval();
              }}
              className={`
                w-8
                h-8
                flex
                items-center
                justify-center
                rounded-full
                bg-slate-800
                hover:bg-slate-700
                light:bg-slate-200
                light:hover:bg-slate-300
                transition-all
                duration-300
                cursor-pointer
                hover:text-lime-500
              `}
            >
              <ArrowLeft size={16} />
            </button>
            <span
              className="
                text-sm
                text-lime-400
                light:text-[#475569]
                select-none
              "
            >
              {page + 1} / {news.length}
            </span>
            <button
              onClick={() => {
                setPage((prev) => (prev === news.length - 1 ? 0 : prev + 1));
                resetInterval();
              }}
              className={`
                w-8
                h-8
                flex
                items-center
                justify-center
                rounded-full
                bg-slate-800
                hover:bg-slate-700
                light:bg-slate-200
                light:hover:bg-slate-300
                transition-all
                duration-300
                cursor-pointer
                hover:text-lime-500
                ${flashDirection === "right" ? "text-lime-500" : ""}
              `}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
