import { ComponentType, SVGAttributes } from "react";
import { Client } from "./client.type";
import { User } from "./user.type";
import { UserManagementProps } from "@/routes/_layout/admin-panel_/-components/UserManagement";
import { ClientManagementProps } from "@/routes/_layout/admin-panel_/-components/ClientManagement";

export type AdminPanelData = {
  users: User[];
  clients: Client[] | null;
};

export type AdminPanelTab =
  | {
      name: string;
      type: "User";
      icon: ComponentType<SVGAttributes<SVGElement>>;
      component: (props: UserManagementProps) => JSX.Element;
    }
  | {
      name: string;
      type: "Client";
      icon: ComponentType<SVGAttributes<SVGElement>>;
      component: (props: ClientManagementProps) => JSX.Element;
    };
