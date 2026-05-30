import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DigitalClock from "./DigitalClock";
import { ArrowLeft, ArrowRight } from "lucide-react";

type DailyNewsProps = {
  news: string[];
};

export default function DailyNews({ news }: DailyNewsProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [flashDirection, setFlashDirection] = useState<"left" | "right" | null>(
    null,
  );
  const [canAnimate, setCanAnimate] = useState(
    localStorage.getItem("animations") === "true",
  );
  const mode = localStorage.getItem("mode");
  const isCompact = mode === "compact";
  const isComfortNoAnimations = mode === "comfortable" && !canAnimate;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!canAnimate || isCompact) return;
    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % news.length);
    }, 5000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [news.length, canAnimate, isCompact]);

  useEffect(() => {
    if (!flashDirection) return;

    const timeout = setTimeout(() => {
      setFlashDirection(null);
    }, 500);

    return () => clearTimeout(timeout);
  }, [flashDirection]);

  useEffect(() => {
    function syncAnimations() {
      setCanAnimate(localStorage.getItem("animations") === "true");
    }

    window.addEventListener("animationsChanged", syncAnimations);

    return () => {
      window.removeEventListener("animationsChanged", syncAnimations);
    };
  }, []);

  function resetInterval() {
    if (!canAnimate) return;
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
      {!isCompact && !isComfortNoAnimations && (
        <div
          className={`
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
              light:bg-[white]
              light:border-[#e2e8f0]
              light:hover:bg-[#f8fafc]
              light:shadow-[0_1px_3px_rgba(0,0,0,0.1)]
              scrollbar-thumb-(--scrollbar-thumb)
              light:scrollbar-thumb-(--scrollbar-thumb)
              transition-all
              duration-300
              ${canAnimate ? "overflow-hidden" : "overflow-x-auto"}
            `}
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
            border-y-2
            border-slate-700
            light:border-[#e2e8f0]
            mb-2
            overflow-hidden
          "
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
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
                className="
                min-h-18
                px-5
                py-3
                text-base
                text-center
                text-slate-300
                light:text-[#475569]
                select-none
              "
              >
                {news[page]}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: news.length }).map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setPage(i);
                  resetInterval();
                }}
                className={`
                h-2.5
                w-7
                cursor-pointer
                rounded-full
                transition-all
                duration-300
                ${
                  i === page
                    ? "bg-[#22c55e]"
                    : "bg-slate-700 light:bg-[#cbd5e1] light:hover:bg-[#b2bbc6]"
                }
              `}
              />
            ))}
          </div>
        </div>
      )}

      {isComfortNoAnimations && (
        <div
          className={`
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
              light:bg-[white]
              light:border-[#e2e8f0]
              light:hover:bg-[#f8fafc]
              light:shadow-[0_1px_3px_rgba(0,0,0,0.1)]
              scrollbar-thumb-(--scrollbar-thumb)
              light:scrollbar-thumb-(--scrollbar-thumb)
              transition-all
              duration-300
              ${canAnimate ? "overflow-hidden" : "overflow-x-auto"}
            `}
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
            relative
            border-y-2
            border-slate-700
            light:border-[#e2e8f0]
            mb-2
            overflow-hidden
            flex
            justify-center
          "
          >
            <button
              onClick={() =>
                setPage((prev) => (prev === 0 ? news.length - 1 : prev - 1))
              }
              className="
              absolute
              left-0
              top-0
              bottom-0
              z-10
              w-10
              flex
              items-center
              justify-center
              bg-slate-900/30
              light:bg-white/30
              hover:bg-slate-800/60
              light:hover:bg-slate-100/70
              transition-all
              duration-300
              cursor-pointer
              text-slate-400
              hover:text-lime-400
            "
            >
              <ArrowLeft size={24} />
            </button>
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
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
                className="
                min-h-18
                max-w-275
                px-5
                py-3
                text-base
                text-center
                text-slate-300
                light:text-[#475569]
                select-none
              "
              >
                {news[page]}
              </motion.div>
            </AnimatePresence>
            <button
              onClick={() =>
                setPage((prev) => (prev === news.length - 1 ? 0 : prev + 1))
              }
              className="
              absolute
              right-0
              top-0
              bottom-0
              z-10
              w-10
              flex
              items-center
              justify-center
              bg-slate-900/30
              light:bg-white/30
              hover:bg-slate-800/60
              light:hover:bg-slate-100/70
              transition-all
              duration-300
              cursor-pointer
              text-slate-400
              hover:text-lime-400
            "
            >
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: news.length }).map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  setPage(i);
                  resetInterval();
                }}
                className={`
                h-2.5
                w-7
                cursor-pointer
                rounded-full
                transition-all
                duration-300
                ${
                  i === page
                    ? "bg-[#22c55e]"
                    : "bg-slate-700 light:bg-[#cbd5e1] light:hover:bg-[#b2bbc6]"
                }
              `}
              />
            ))}
          </div>
        </div>
      )}

      {localStorage.getItem("mode") === "compact" && (
        <div
          className={`
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
          `}
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
                initial={
                  canAnimate
                    ? {
                        opacity: 0,
                        x: 10,
                      }
                    : undefined
                }
                animate={
                  canAnimate
                    ? {
                        opacity: 1,
                        x: 0,
                      }
                    : undefined
                }
                exit={
                  canAnimate
                    ? {
                        opacity: 0,
                        x: -10,
                      }
                    : undefined
                }
                transition={
                  canAnimate
                    ? {
                        duration: 0.2,
                        ease: "easeInOut",
                      }
                    : undefined
                }
                className="
                flex
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
