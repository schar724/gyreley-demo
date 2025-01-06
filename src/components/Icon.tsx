import { ComponentType, SVGAttributes } from "react";
import { cn } from "@/utils";

interface IconProps {
  icon: ComponentType<SVGAttributes<SVGElement>>;
  className?: string;
}

export default function Icon({ icon: Icon, className = "" }: IconProps) {
  return (
    <Icon className={cn("w-6 h-6 shrink-0", className)} aria-hidden="true" />
  );
}
