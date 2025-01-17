import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Icon from "@/components/Icon";
import { Link } from "@tanstack/react-router";
import { cn, generateProfilePhoto } from "@/utils";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { NavStructure } from "@/types/nav.type";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useMobileContext } from "@/context/MobileContext";

type HeaderProps = {
  userStatus: "online" | "offline";
  setSidebarOpen?: (value: React.SetStateAction<boolean>) => void;
  nav: NavStructure | undefined;
};

export default function Header({
  userStatus,
  setSidebarOpen,
  nav,
}: HeaderProps) {
  const { mobile } = useMobileContext();
  const { user } = useAuth();

  const [notificationCount] = useState<number>(3);

  return (
    <div className="fixed w-full top-0 z-50 flex items-center h-16 px-4 bg-background border-b border-gray-200 shadow-sm shrink-0 gap-x-4 sm:gap-x-6">
      {!!setSidebarOpen && !mobile && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-foreground lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
      )}
      <div className="flex self-stretch justify-end flex-1 gap-x-4 lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <div className="relative">
            <div className="-m-1.5 flex items-center p-2">
              <span className="sr-only">View notifications</span>
              <BellIcon
                aria-hidden="true"
                className="w-6 h-6 text-foreground-muted"
              />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-600 text-white text-xs leading-tight font-bold text-center">
                  {notificationCount}
                </span>
              )}
            </div>
          </div>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              <span className="relative flex-shrink-0 inline-block">
                <img
                  className="w-10 h-10 rounded-full"
                  src={generateProfilePhoto(
                    user ? `${user.firstName} ${user.lastName}` : "User",
                  )}
                  alt=""
                />
                <span
                  className={cn(
                    userStatus === "online" ? "bg-emerald-600" : "bg-gray-300",
                    "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white",
                  )}
                  aria-hidden="true"
                />
              </span>
              <span className="hidden lg:flex lg:items-center">
                <span
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                  aria-hidden="true"
                >
                  {user
                    ? `${user.firstName} ${user.lastName}` || `${user.email}`
                    : "User"}
                </span>

                <Icon icon={ChevronDownIcon} className="ml-2 text-gray-400" />
              </span>
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {nav &&
                nav.userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <Link
                      to={`${item.route}`}
                      className="group block px-3 py-1 text-sm leading-6 text-gray-900"
                      activeProps={{ className: "bg-gray-100" }}
                    >
                      {item.name}
                    </Link>
                  </MenuItem>
                ))}
              <MenuItem key={"logout"}>
                <Link
                  to=""
                  onClick={() => {
                    alert("You are now logged out!");
                  }}
                  className={
                    "group block px-3 py-1 text-sm leading-6 text-gray-900"
                  }
                >
                  Log Out
                </Link>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
}
