import { Link as RouterLink } from "@tanstack/react-router";
import { ReactNode } from "react";

interface NavLinkProps {
  to?: string;
  children?: ReactNode;
  title?: string;
}

export default function NavLink({
  to = "#",
  children = null,
  title = "",
}: NavLinkProps) {
  return (
    <RouterLink
      to={`${to}`}
      title={title}
      className="group nav-link"
      activeProps={{ className: "text-white bg-primary-active" }}
    >
      {children}
    </RouterLink>
  );
}
