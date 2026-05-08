type StatCardProps = {
  title: string;
  value: string;
  change: string;
};

export default function StatCardProps({ title, value, change }: StatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5">
      <p className="text-slate-400 text-sm">{title}</p>

      <div className="flex items-end justify-between mt-2">
        <h3 className="text-2xl font-bold">{value}</h3>

        <span className="text-sm text-emerald-400">{change}</span>
      </div>
    </div>
  );
}
