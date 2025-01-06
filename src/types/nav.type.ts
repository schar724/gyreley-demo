import { ComponentType, SVGAttributes } from "react";

export interface NavItem {
  name: string;
  route?: string;
  icon?: ComponentType<SVGAttributes<SVGElement>>;
  children?: NavItem[];
}

export interface NavStructure {
  dashboard: NavItem[]; // Array of navigation items for the dashboard
  userNavigation: {
    name: string;
    route: string;
  }[]; // Array for user navigation, which only has name and route
  settings: {
    name: string;
    route: string;
    icon: React.ComponentType; // Settings also has an icon
  };
}
