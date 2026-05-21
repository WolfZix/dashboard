import { Search } from "lucide-react";

type UsersSearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function UsersSearch({ search, setSearch }: UsersSearchProps) {
  return (
    <div className="usersSearchWrapper">
      <input
        type="text"
        className="usersSearch"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search size={18} className="usersSearchIcon" />
    </div>
  );
}
