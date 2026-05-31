import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

type StatCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function StatCard({ title, value, change }: StatCardProps) {
  const numericChange = parseFloat(change);
  const changeTextColor =
    numericChange > 0
      ? "text-emerald-400"
      : numericChange < 0
        ? "text-red-500"
        : "text-slate-400";
  const changeSymbol = numericChange > 0 ? "+" : "";
  const [canAnimate, setCanAnimate] = useState(
    localStorage.getItem("animations") === "true",
  );

  useEffect(() => {
    function syncAnimations() {
      setCanAnimate(localStorage.getItem("animations") === "true");
    }

    window.addEventListener("animationsChanged", syncAnimations);

    return () => {
      window.removeEventListener("animationsChanged", syncAnimations);
    };
  }, []);

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.2 }}
      whileHover={canAnimate ? { scale: 1.02 } : undefined}
      className="dashboard-card rounded-2xl compact:rounded-xl p-5 compact:p-3"
    >
      <p className="text-slate-400 light:text-[#64748b] text-sm transition-all duration-300">
        {title}
      </p>

      <div className="flex items-end justify-between mt-2 compact:mt-1 transition-all duration-300">
        <h3 className="text-2xl font-bold light:text-[#0f172a] transition-all duration-300">
          {value}
        </h3>

        <span
          className={`text-sm ${changeTextColor} transition-all duration-300`}
        >
          {changeSymbol}
          {change}
        </span>
      </div>
    </motion.div>
  );
}
