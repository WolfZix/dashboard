import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DigitalClock from "./DigitalClock";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAnimations } from "../../../context/AnimationContext";
import { useMode } from "../../../context/ModeContext";

type DailyNewsProps = {
  news: string[];
};

export default function DailyNews({ news }: DailyNewsProps) {
  const [page, setPage] = useState(0);
  const [flashDirection, setFlashDirection] = useState<"left" | "right" | null>(
    null,
  );
  const { canAnimate } = useAnimations();
  const { mode } = useMode();
  const isCompact = mode === "compact";
  const isComfort = mode === "comfortable";
  const showArrow = isComfort && !canAnimate;
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
      <div
        className={`
              dashboard-card
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
            `}
      >
        <h2
          className="
            dashboard-title 
            text-2xl
            mx-5
            mb-2
            compact:mx-2.5
            compact:mb-1
            compact:text-xl
          "
        >
          <DigitalClock />
        </h2>
        <div
          className="
            relative
            border-y-2
            dashboard-border
            mb-2
            overflow-hidden
            flex
            justify-center
            transition-all
            duration-300
          "
        >
          {showArrow && (
            <button
              onClick={() =>
                setPage((prev) => (prev === 0 ? news.length - 1 : prev - 1))
              }
              className="dashboard-news-arrow left-0"
            >
              <ArrowLeft size={24} />
            </button>
          )}
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
                px-14
                py-3
                text-base
                text-center
                dashboard-text
                select-none
              "
            >
              {news[page]}
            </motion.div>
          </AnimatePresence>
          {showArrow && (
            <button
              onClick={() =>
                setPage((prev) => (prev === news.length - 1 ? 0 : prev + 1))
              }
              className="dashboard-news-arrow right-0"
            >
              <ArrowRight size={24} />
            </button>
          )}
        </div>
        <div className="flex justify-center gap-1.5">
          {Array.from({ length: news.length }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setPage(i);
                resetInterval();
              }}
              className={`dashboard-pagination-dot 
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

      {isCompact && (
        <div
          className={`
          dashboard-card
          rounded-2xl
          mt-0
          py-1.5
          min-h-full
          col-span-1
          overflow-hidden
          flex
          flex-col
          `}
        >
          <h2
            className="
            dashboard-title
            mx-2.5
            mb-2
            text-xl
            "
          >
            <DigitalClock />
          </h2>
          <div
            className="
            flex-1
            overflow-hidden
            border-y-2
            dashboard-border
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
                        duration: 0.3,
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
                dashboard-text
                select-none
                transition-all
                duration-300
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
              className={`dashboard-icon-button hover:text-lime-500
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
              className={`dashboard-icon-button hover:text-lime-500
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
