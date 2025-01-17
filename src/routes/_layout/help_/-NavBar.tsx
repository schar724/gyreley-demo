import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Icon from "@components/Icon";
import { Link } from "@tanstack/react-router";
import { Route as faqRoute } from "./faq";
import { Route as downloadsRoute } from "./downloads";
import { PageLink } from "@/types/page.type";

export default function Navbar() {
  const helpLinks: PageLink[] = [
    { name: "Home", path: "/help" },
    { name: "FAQ", path: faqRoute.to },
    { name: "Manual", path: "/help/pfmanual" },
    { name: "Downloads", path: downloadsRoute.to },
  ];

  return (
    <nav id="top" className="z-10 py-4 bg-primary sticky">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary-foreground">
            Gyreley Help Site
          </div>

          {/* Desktop Links */}
          <div className="hidden space-x-4 md:flex">
            {helpLinks.map((link, index) => {
              return (
                <div key={index}>
                  <Link
                    to={link.path}
                    className={"group nav-link"}
                    activeProps={{
                      className: "text-white font-semibold bg-primary-active",
                    }}
                    activeOptions={{ exact: true }}
                  >
                    {link.name}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex space-x-4 md:hidden">
            <Menu as="div" className="relative inline-block">
              <div>
                <MenuButton className="inline-flex justify-center w-full text-sm font-medium text-white rounded-md ">
                  <Icon icon={Bars3Icon} className="w-8 h-8" />
                </MenuButton>
              </div>

              <MenuItems className="absolute top-10 right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {helpLinks.map((link, index) => (
                    <div key={`mi-${index}`}>
                      <MenuItem>
                        <Link
                          to={link.path}
                          className={"block px-4 py-2 text-sm text-blue-700"}
                          activeProps={{
                            className: "bg-gray-100 font-semibold",
                          }}
                          activeOptions={{ exact: true }}
                        >
                          {link.name}
                        </Link>
                      </MenuItem>
                    </div>
                  ))}
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
