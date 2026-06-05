import { useUser } from "../../context/UserContext";

type SidebarOptions = {
  name: string;
  icon: React.ElementType;
};

type SettingsSidebarProps = {
  options: SidebarOptions[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

export default function SettingsSidebar({
  options,
  activeTab,
  setActiveTab,
}: SettingsSidebarProps) {
  const { currentUser } = useUser();
  const currentUserColor = currentUser?.color || "#22c55e";

  return (
    <div className="w-72 h-fit rounded-4xl pt-6 compact:rounded-2xl compact:pt-3">
      <div className="mb-6 compact:mb-3">
        <h1 className="text-2xl font-bold px-3 compact:px-1.5">Settings</h1>
      </div>

      <div className="flex flex-col">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <button
              key={option.name}
              onClick={() => setActiveTab(option.name)}
              className={`relative flex items-center gap-3 px-3 py-1.5 compact:gap-1.5 compact:px-1.5 compact:py-1 w-full rounded-md hover:bg-slate-800 text-white light:text-slate-900 light:hover:bg-slate-200 text-sm transition-all duration-300 cursor-pointer
            ${
              activeTab === option.name
                ? `bg-slate-800 light:bg-slate-200 pl-4 compact:pl-2`
                : ""
            }`}
            >
              <Icon size={15} />
              <span>{option.name}</span>
              {activeTab === option.name && (
                <div
                  style={{
                    backgroundColor: currentUserColor,
                  }}
                  className={`absolute -left-1.5 rounded-4xl compact:rounded-2xl w-0.75 h-6`}
                ></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
