import type { SortBy, SortOrder } from "./users.types";
import { renderSortIcon } from "./users.helpers";

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
    <thead>
      <tr>
        <th onClick={() => handleSort("id")}>
          <span className="flex justify-center gap-2 items-center">
            ID
            {renderSortIcon("id", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th onClick={() => handleSort("name")}>
          <span className="flex justify-center gap-2 items-center">
            Username
            {renderSortIcon("name", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th onClick={() => handleSort("role")}>
          <span className="flex justify-center gap-2 items-center">
            Role
            {renderSortIcon("role", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th onClick={() => handleSort("status")}>
          <span className="flex justify-center gap-2 items-center">
            Status
            {renderSortIcon("status", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th onClick={() => handleSort("joined")}>
          <span className="flex justify-center gap-2 items-center">
            Join date
            {renderSortIcon("joined", sortBy, sortOrder, hasUserSorted)}
          </span>
        </th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}
