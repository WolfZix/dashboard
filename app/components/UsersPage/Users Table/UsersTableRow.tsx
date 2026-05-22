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
    <tr className=" transition-all duration-300">
      <td className=" transition-all duration-300">{user.id}</td>
      <td className=" transition-all duration-300">{user.name}</td>
      <td className=" transition-all duration-300">{user.role}</td>
      <td className=" transition-all duration-300">
        <span
          className={`status-${user.status.toLowerCase()} transition-all duration-300`}
        >
          {user.status}
        </span>
      </td>
      <td className=" transition-all duration-300">{user.joined}</td>
      <td className=" transition-all duration-300">
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
