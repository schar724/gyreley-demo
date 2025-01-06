import Icon from "@/components/Icon";
import { Link } from "@tanstack/react-router";
import { NavStructure } from "@/types/nav.type";

type BottomNavProps = {
  nav: NavStructure | undefined;
};
export default function BottomNav({ nav }: BottomNavProps) {
  return (
    <div className="fixed flex bottom-0 left-0 z-20 w-full h-16 justify-between bg-background border-t border-gray-200">
      {nav &&
        nav.dashboard.map((tab, index) => (
          <Link
            key={"tab-" + index}
            to={tab.route}
            className="flex-1 flex justify-center items-center py-2"
            activeProps={{ className: "text-primary-foreground bg-primary" }}
          >
            {tab.icon && <Icon icon={tab.icon} className="w-6 h-6" />}
          </Link>
        ))}
    </div>
  );
}
