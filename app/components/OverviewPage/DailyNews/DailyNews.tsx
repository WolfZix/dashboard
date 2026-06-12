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
  const [isMobileLayout, setIsMobileLayout] = useState(
    window.innerWidth < 1280,
  );

  const isCompact = mode === "compact";
  const isComfort = mode === "comfortable";

  const showArrow =
    isComfort &&
    !canAnimate &&
    !isMobileLayout;

  useEffect(() => {
    function handleResize() {
      setIsMobileLayout(window.innerWidth < 1280);
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        className="
          hidden xl:block
          dashboard-card
          rounded-2xl
          col-span-1
          xl:col-span-full
          min-h-78
          xl:min-h-18
          xl:mt-2
          py-3
        "
      >
        <h2
          className="
            dashboard-title
            text-2xl
            mx-5
            mb-2
          "
        >
          <DigitalClock />
        </h2>

        <div
          className="
            relative
            w-full
            border-t-2
            xl:border-y-2
            dashboard-border
            mb-2
            overflow-hidden
            flex
            flex-col
            items-center
            justify-end
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
                min-h-54
                xl:min-h-18
                px-8
                xl:px-14
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

          <span
            className="
              text-sm
              text-lime-400
              light:text-[#475569]
              select-none
              xl:hidden
            "
          >
            {page + 1} / {news.length}
          </span>
        </div>

        <div className="flex justify-center gap-1.5">
          {Array.from({ length: news.length }).map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setPage(i);
                resetInterval();
              }}
              className={`dashboard-pagination-dot lg:h-fit lg:w-9 ${
                i === page
                  ? "bg-[#22c55e] text-black font-semibold scale-115"
                  : "bg-slate-700 light:bg-[#cbd5e1] light:hover:bg-[#b2bbc6]"
              }`}
            >
              {i + 1}
              </div>
          ))}
        </div>
      </div>

      {(isCompact || isMobileLayout) && (
        <div
          className="
            dashboard-card
            rounded-2xl
            col-span-1
            overflow-hidden
            flex
            flex-col
            min-h-66
            lg:h-fit
          "
        >
          <h2
            className="
              dashboard-title
              px-4
              py-3
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
                  items-center
                  justify-center
                  text-center

                  min-h-42
                  lg:min-h-fit

                  px-4
                  py-6

                  compact:px-2
                  compact:py-2

                  text-base
                  dashboard-text
                  select-none
                "
              >
                {news[page]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="
              flex
              items-center
              justify-between

              px-4
              py-4 lg:py-2

              compact:px-2
            "
          >
            <button
              onClick={() => {
                setPage((prev) => (prev === 0 ? news.length - 1 : prev - 1));
                resetInterval();
              }}
              className="dashboard-icon-button hover:text-lime-500"
            >
              <ArrowLeft size={18} />
            </button>

            <span
              className="
                text-base lg:text-sm
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
              className={`dashboard-icon-button hover:text-lime-500 ${
                flashDirection === "right" ? "text-lime-500" : ""
              }`}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
