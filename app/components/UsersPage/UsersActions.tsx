import { Eye, Pencil, Trash } from "lucide-react";
import ViewUser from "./ViewUser";
import EditUser from "./EditUser";

type UsersActionsProps = {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

function viewUser() {
  return <ViewUser />;
}
function editUser() {
  return <EditUser />;
}
function deleteUser() {
  console.log("Delete user");
}

export default function UsersActions({
  canView,
  canEdit,
  canDelete,
}: UsersActionsProps) {
  return (
    <div className="userActions">
      {canView && (
        <button onClick={() => viewUser()} className="userActionBtn">
          <Eye />
        </button>
      )}
      {canEdit && (
        <button onClick={() => editUser()} className="userActionBtn">
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
