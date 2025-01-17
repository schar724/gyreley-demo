import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  ClipboardIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";
import { NavItem, NavStructure } from "@/types/nav.type";
import { Role } from "@/types/role.type";

const dashboardKey: string = "dashboard";
const plasticPipeLocatesKey: string = 'plasticPipeLocates'
const adminPanelKey: string = "adminPanel";
const operatorSupportKey: string = "operatorSupport";
const helpKey: string = "help";
const settingsKey: string = "settings";
const toggleMobileKey: string = "toggleMobile";

const navItems: { [key: string]: NavItem } = {
  dashboard: {
    name: "Dashboard",
    route: "/dashboard",
    icon: HomeIcon,
    key: dashboardKey,
  },
  plasticPipeLocates: {
    name: "Plastic Pipe Locates",
    route: '/plastic-pipe-locates',
    icon: ClipboardIcon,
    key: plasticPipeLocatesKey
  },
  adminPanel: {
    name: "Admin Panel",
    route: "/admin-panel",
    icon: ShieldCheckIcon,
    key: adminPanelKey,
  },
  operatorSupport: {
    name: "Operator Support",
    route: "/operator-support",
    icon: ChatBubbleLeftRightIcon,
    key: operatorSupportKey,
  },
  help: {
    name: helpKey,
    route: "/help",
    icon: QuestionMarkCircleIcon,
    key: helpKey,
  },
  toggleMobile: {
    name: "Toggle Mobile",
    route: ".",
    icon: DevicePhoneMobileIcon,
    key: toggleMobileKey,
  }
};

export const useNavItems = (roles: Set<Role>): NavStructure => {
  const allowedNavItems = new Set<string>();

  // Always add Help, Settings, and Profile for all roles
  allowedNavItems.add(helpKey);
  allowedNavItems.add(settingsKey);

  // Check for roles and add appropriate nav items
  if (roles.has("sysAdmin")) {
    // sysAdmin gets access to all options
    Object.keys(navItems).forEach((key) => allowedNavItems.add(key));
  } else {
    // Check specific roles
    if (roles.has("clientAdmin")) {
      allowedNavItems.add(adminPanelKey); // Add admin panel for clientAdmin
    }
    if (roles.has("csr") || roles.has("user")) {
      allowedNavItems.add(operatorSupportKey); // Add operator support for csr and user
    }
  }

  // Build the final navigation structure
  const nav = {
    dashboard: Object.values(navItems).filter((item) =>
      allowedNavItems.has(item.key),
    ),
    userNavigation: [
      {
        name: "Profile",
        route: "/profile",
      },
    ],
    settings: {
      name: "Settings",
      route: "/settings",
      icon: Cog6ToothIcon,
    },
  };

  return nav;
};

export function getLinkLabel(
  route: string,
  menu: NavItem[] | undefined,
): string | null {
  if (!menu) {
    return null;
  }

  for (const item of menu) {
    if (item.route === route) {
      return item.name;
    }

    if ("children" in item) {
      const found = getLinkLabel(route, item.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
}
