import { useEffect, useState } from "react";
import { getDashboardData } from "../../../services/dashboard.server";
import NotificationCard from "./NotificationCard";

type DashboardData = {
  notifications: {
    from: string;
    title: string;
    date: string;
    description: string;
  }[];
};

type DropdownProps = {
  onClose: () => void;
};

export default function Dropdown({ onClose }: DropdownProps) {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    async function loadData() {
      const result = await getDashboardData();
      setData(result);
    }
    loadData();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const dropdown = document.getElementById("notificationsDropdown");

      const button = document.getElementById("notificationsButton");

      const target = e.target as Node;

      if (
        dropdown &&
        !dropdown.contains(target) &&
        button &&
        !button.contains(target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="notificationsDropdown"
      className="
        absolute
        top-14
        right-0
        w-96
        max-h-125
        overflow-y-auto
        rounded-2xl
        border
        scrollbar-thumb-[white]
        light:scrollbar-thumb-slate-200
        backdrop-blur-xl
        border-slate-700
        light:bg-[#f8fafc]
        light:border-[#e2e8f0]
        shadow-2xl
        z-50
      "
    >
      <div className="p-4 border-b border-slate-700 light:border-[#e2e8f0]">
        <h2 className="font-semibold text-lg">Notifications</h2>
      </div>
      <div className="p-2 space-y-2">
        {data?.notifications.map((notification, index) => {
          return (
            <div key={index}>
              <NotificationCard notificationData={notification} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
