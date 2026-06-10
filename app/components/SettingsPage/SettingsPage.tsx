import { Bell, Brush, LucideUnlock, UserRound } from "lucide-react";
import SettingsAppearance from "./Appearance/SettingsAppearance";
import SettingsAccount from "./SettingsAccount";
import SettingsPrivacy from "./SettingsPrivacy";
import SettingsNotifications from "./SettingsNotifications";
import SettingsSidebar from "./SettingsSidebar";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { getUsername } from "../../services/authService";
import { getUserByName } from "../../services/userService";

export default function SettingsPage() {
  const { currentUser, setCurrentUser } = useUser();
  useEffect(() => {
    const storedUsername = getUsername();
    if (!storedUsername) return;
    const foundUser = getUserByName(storedUsername);
    if (foundUser) setCurrentUser(foundUser);
  }, []);
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

  if (!currentUser) return <div>Loading...</div>;

  return (
    <div className="flex gap-6 compact:gap-3 h-full">
      <SettingsSidebar
        options={options}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex-1 flex flex-col gap-6 compact:gap-3">
        {activeTab === "Appearance" && (
          <SettingsAppearance
            user={currentUser}
            setCurrentUser={setCurrentUser}
          />
        )}
        {activeTab === "Account" && (
          <SettingsAccount user={currentUser} setCurrentUser={setCurrentUser} />
        )}
        {activeTab === "Privacy" && <SettingsPrivacy />}
        {activeTab === "Notifications" && <SettingsNotifications />}
      </div>
    </div>
  );
}
