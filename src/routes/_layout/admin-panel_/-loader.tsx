import { AdminPanelData, AdminPanelTab } from "@/types/admin-panel.type";
import { BuildingOfficeIcon, UserIcon } from "@heroicons/react/24/outline";
import UserManagement, {
  UserManagementProps,
} from "./-components/UserManagement";
import ClientManagement, {
  ClientManagementProps,
} from "./-components/ClientManagement";
import { getUsers } from "@/hooks/users";
import { getClients } from "@/hooks/clients";

const adminPanelTabOptions: AdminPanelTab[] = [
  {
    name: "User Management",
    type: "User",
    icon: UserIcon,
    component: (props: UserManagementProps) => <UserManagement {...props} />,
  },
  {
    name: "Client Management",
    type: "Client",
    icon: BuildingOfficeIcon,
    component: (props: ClientManagementProps) => (
      <ClientManagement {...props} />
    ),
  },
];

export async function loader(): Promise<{
  adminPanelData: AdminPanelData;
  isSysAdmin: boolean;
  tabs: AdminPanelTab[];
}> {
  let adminPanelData: AdminPanelData = { users: [], clients: null };
  let isSysAdmin: boolean = true;
  const tabs = adminPanelTabOptions;

  adminPanelData.users = getUsers();
  adminPanelData.clients = getClients();

  return { adminPanelData, isSysAdmin, tabs };
}
