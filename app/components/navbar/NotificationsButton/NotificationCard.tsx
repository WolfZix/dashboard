import { div } from "framer-motion/client";

type NotificationCardProps = {
  notificationData: {
    from: string;
    title: string;
    date: string;
    description: string;
  };
};

export default function NotificationCard({
  notificationData,
}: NotificationCardProps) {
  const { from, title, date, description } = notificationData;
  return (
    <div
      className="
        p-4
        rounded-xl
        border

        bg-slate-900
        border-slate-700

        light:bg-white
        light:border-[#e2e8f0]
      "
    >
      <div className="flex items-center justify-between mb-1">
        <p className="font-medium max-w-45">{title}</p>

        <span
          className="
            text-xs
            text-slate-400
            light:text-[#64748b]
          "
        >
          {date}
        </span>
      </div>

      <p
        className="
          text-sm
          text-slate-400
          light:text-[#64748b]
        "
      >
        {description}
      </p>

      <p
        className="
          text-xs
          mt-3
          text-green-500
        "
      >
        {from}
      </p>
    </div>
  );
}
