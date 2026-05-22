import { Search } from "lucide-react";

type UsersSearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function UsersSearch({ search, setSearch }: UsersSearchProps) {
  return (
    <div className="usersSearchWrapper transition-all duration-300">
      <input
        type="text"
        className="usersSearch transition-all duration-300"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search
        size={18}
        className="usersSearchIcon transition-all duration-300"
      />
    </div>
  );
}
