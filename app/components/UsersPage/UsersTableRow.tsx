import UsersActions from "./UsersActions";
import type { User } from "./users.types";

type UsersTableRowProps = {
  user: User;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

export default function UsersTableRow({
  user,
  canView,
  canEdit,
  canDelete,
}: UsersTableRowProps) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.role}</td>
      <td>
        <span className={`status-${user.status.toLowerCase()}`}>
          {user.status}
        </span>
      </td>
      <td>{user.joined}</td>
      <td>
        <UsersActions
          canView={canView}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      </td>
    </tr>
  );
}
