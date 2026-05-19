import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { SortBy, SortOrder, User } from "./users.types";

export function sortUsers(users: User[], sortBy: SortBy, sortOrder: SortOrder) {
  return [...users].sort((a, b) => {
    if (!sortOrder) return 0;

    if (sortBy === "status") {
      const statusOrder = {
        Online: 4,
        Busy: 3,
        Away: 2,
        Offline: 1,
      };

      const aStatus = statusOrder[a.status as keyof typeof statusOrder];
      const bStatus = statusOrder[b.status as keyof typeof statusOrder];
      return sortOrder === "asc" ? bStatus - aStatus : aStatus - bStatus;
    }

    if (sortBy === "id") return sortOrder === "asc" ? a.id - b.id : b.id - a.id;

    const aValue = a[sortBy].toLowerCase();
    const bValue = b[sortBy].toLowerCase();
    return sortOrder === "asc"
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });
}

export function renderSortIcon(
  column: SortBy,
  sortBy: SortBy,
  sortOrder: SortOrder,
  hasUserSorted: boolean,
) {
  if (!hasUserSorted) return <ArrowUpDown size={18} className="opacity-30" />;
  if (sortBy !== column) {
    return <ArrowUpDown size={18} className="opacity-30" />;
  }
  if (sortOrder === "asc") return <ArrowDown size={18} />;
  if (sortOrder === "desc") return <ArrowUp size={18} />;
  return <ArrowUpDown size={18} className="opacity-30" />;
}

export function getPermissions(currentUserRole: string) {
  return {
    canView: true,
    canEdit: currentUserRole === "Admin" || currentUserRole === "Moderator",
    canDelete: currentUserRole === "Admin",
  };
}
