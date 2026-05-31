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
      dashboard-card
      p-4
      compact:p-2
      rounded-xl
      "
    >
      <div className="flex items-center justify-between mb-1 compact:mb-0.5">
        <p className="font-medium max-w-45 compact:max-w-65">{title}</p>

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
          compact:mt-1.5
          text-green-500
        "
      >
        {from}
      </p>
    </div>
  );
}
