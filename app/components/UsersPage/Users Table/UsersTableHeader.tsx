import type { SortBy, SortOrder } from "../users.types";
import { renderSortIcon } from "../users.helpers";

type UsersTableHeaderProps = {
  sortBy: SortBy;
  sortOrder: SortOrder;
  hasUserSorted: boolean;
  handleSort: (column: SortBy) => void;
};

export default function UsersTableHeader({
  sortBy,
  sortOrder,
  hasUserSorted,
  handleSort,
}: UsersTableHeaderProps) {
  return (
    <thead className=" transition-all duration-300">
      <tr className=" transition-all duration-300">
        <th
          onClick={() => handleSort("id")}
          className=" transition-all duration-300"
        >
          <span className="flex justify-center gap-2 items-center">
            ID
            {renderSortIcon("id", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th
          onClick={() => handleSort("name")}
          className=" transition-all duration-300"
        >
          <span className="flex justify-center gap-2 items-center">
            Username
            {renderSortIcon("name", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th
          onClick={() => handleSort("role")}
          className=" transition-all duration-300"
        >
          <span className="flex justify-center gap-2 items-center">
            Role
            {renderSortIcon("role", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th
          onClick={() => handleSort("status")}
          className=" transition-all duration-300"
        >
          <span className="flex justify-center gap-2 items-center">
            Status
            {renderSortIcon("status", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th
          onClick={() => handleSort("joined")}
          className=" transition-all duration-300"
        >
          <span className="flex justify-center gap-2 items-center">
            Join date
            {renderSortIcon("joined", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th className=" transition-all duration-300">Actions</th>
      </tr>
    </thead>
  );
}
