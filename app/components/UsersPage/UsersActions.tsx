import { Eye, Pencil, Trash } from "lucide-react";

type UsersActionsProps = {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export default function UsersActions({
  canView,
  canEdit,
  canDelete,
  onView,
  onEdit,
  onDelete,
}: UsersActionsProps) {
  return (
    <div className="userActions transition-all duration-300">
      {canView && (
        <button
          onClick={onView}
          className="userActionBtn transition-all duration-300"
        >
          <Eye />
        </button>
      )}
      {canEdit && (
        <button
          onClick={onEdit}
          className="userActionBtn transition-all duration-300"
        >
          <Pencil />
        </button>
      )}
      {canDelete && (
        <button
          onClick={onDelete}
          className="userActionBtn userDeleteBtn transition-all duration-300"
        >
          <Trash />
        </button>
      )}
    </div>
  );
}
