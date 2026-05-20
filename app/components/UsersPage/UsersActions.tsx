import { Eye, Pencil, Trash } from "lucide-react";

type UsersActionsProps = {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  onView: () => void;
  onEdit: () => void;
};

function deleteUser() {
  console.log("Delete user");
}

export default function UsersActions({
  canView,
  canEdit,
  canDelete,
  onView,
  onEdit,
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
        <button
          onClick={() => deleteUser()}
          className="userActionBtn userDeleteBtn"
        >
          <Trash />
        </button>
      )}
    </div>
  );
}
