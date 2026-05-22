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
    <div className="userActions">
      {canView && (
        <button onClick={onView} className="userActionBtn">
          <Eye />
        </button>
      )}
      {canEdit && (
        <button onClick={onEdit} className="userActionBtn">
          <Pencil />
        </button>
      )}
      {canDelete && (
        <button onClick={onDelete} className="userActionBtn userDeleteBtn">
          <Trash />
        </button>
      )}
    </div>
  );
}
