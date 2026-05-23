import { useState } from "react";
import SettingsAppearance from "./SettingsAppearance";
import SettingsAccount from "./SettingsAccount";
import SettingsPrivacy from "./SettingsPrivacy";
import SettingsNotifications from "./SettingsNotifications";
import { Bell, Brush, LucideUnlock, UserRound } from "lucide-react";
import SettingsSidebar from "./SettingsSidebar";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Appearance");
  const options = [
    {
      name: "Appearance",
      icon: Brush,
    },
    {
      name: "Account",
      icon: UserRound,
    },
    {
      name: "Privacy",
      icon: LucideUnlock,
    },
    {
      name: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <div className="flex gap-6 h-full">
      <SettingsSidebar
        options={options}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col gap-6">
        {activeTab === "Appearance" && <SettingsAppearance />}
        {activeTab === "Account" && <SettingsAccount />}
        {activeTab === "Privacy" && <SettingsPrivacy />}
        {activeTab === "Notifications" && <SettingsNotifications />}
      </div>
    </div>
  );
}
