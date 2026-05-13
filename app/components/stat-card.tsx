import { motion } from "framer-motion";

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
  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900 border border-slate-700 light:bg-[white] light:border-slate-300 rounded-2xl p-5"
    >
      <p className="text-slate-400 light:text-slate-950 text-sm">{title}</p>

      <div className="flex items-end justify-between mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>

        <span className="text-sm text-emerald-400">{change}</span>
      </div>
    </motion.div>
  );
}
