import { User } from "@/types/user.type";
import { Column } from "@components/SortableTable";
import EditUserForm from "./EditUserForm";
import { ReactNode, useState } from "react";
import { createUserDirectory } from "@/utils.ts";
import ManagementPanel from "./ManagementPanel.tsx";
import { addUser, updateUser, deleteUser } from "@/hooks/users.ts";

const user_status_style: Record<string, string> = {
  active: "text-green-600 text-shadow-green-glow",
  pending: "text-yellow-600 text-shadow-yellow-glow",
  locked: "text-red-600 text-shadow-red-glow",
};

export type UserManagementProps = {
  users: User[];
};

export default function UserManagement({
  users,
}: UserManagementProps): JSX.Element {
  const [usersState, setUsersState] = useState<User[]>(users);

  function handleSaveUser(user: User) {
    if (user.uid) {
      const updatedUsers = updateUser(user.uid, user);
      setUsersState(updatedUsers);
    } else {
      const userId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      user.uid = userId;
      const updatedUsers = addUser(user);
      setUsersState(updatedUsers);
    }
  }

  function handleDeleteUser(user: User) {
    const updatedUsers = deleteUser(user.uid);
    setUsersState(updatedUsers);
  }

  const userColumns: Column<User>[] = [
    { label: "First name", key: "firstName", sortable: true },
    { label: "Last Name", key: "lastName", sortable: true },
    { label: "Email", key: "email", sortable: true },
    {
      label: "Phone Number",
      key: "phoneNumber",
      sortable: false,
    },
    {
      label: "Role(s)",
      key: "roles",
      sortable: true,
      options: {
        collapse: "hidden md:table-cell",
        render: (user: User, column: Column<User>): ReactNode => (
          <td
            key={`${user.uid}-profiles`}
            className={`admin-table-element whitespace-break-spaces ${column?.options?.collapse}`}
          >
            {user?.roles.map((role) => role).join(", ")}
          </td>
        ),
      },
    },
    {
      label: "User Status",
      key: "authStatus",
      sortable: true,
      options: {
        collapse: "hidden md:table-cell",
        render: (user: User, column: Column<User>) => (
          <td
            key={`${user.uid}-status`}
            className={`admin-table-element whitespace-nowrap ${column?.options?.collapse} ${
              user.authStatus
                ? user_status_style[user.authStatus]
                : "No Status Found"
            }`}
          >
            {user.authStatus}
          </td>
        ),
      },
    },
  ];

  return (
    <ManagementPanel<User>
      data={usersState}
      columns={userColumns}
      formComponent={EditUserForm}
      handleSaveEntity={handleSaveUser}
      handleDeleteEntity={handleDeleteUser}
      directoryCreator={createUserDirectory}
      entityName="User"
    />
  );
}
