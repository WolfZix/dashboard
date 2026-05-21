import UsersActions from "../UsersActions";
import type { User } from "../users.types";

type UsersTableRowProps = {
  user: User;
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setEditingUser: React.Dispatch<React.SetStateAction<User | null>>;
  setDeleteUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function UsersTableRow({
  user,
  canView,
  canEdit,
  canDelete,
  setSelectedUser,
  setEditingUser,
  setDeleteUser,
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
          onView={() => setSelectedUser(user)}
          onEdit={() => setEditingUser(user)}
          onDelete={() => setDeleteUser(user)}
        />
      </td>
    </tr>
  );
}
