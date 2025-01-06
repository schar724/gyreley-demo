import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Icon from "@components/Icon";
import NavLink from "./NavLink";
import { NavItem as TNavItem } from "@/types/nav.type";

export default function NavItem({ item }: { item: TNavItem }): JSX.Element {
  return (
    <>
      {item.children ? (
        <Disclosure>
          <DisclosureButton className="justify-between w-full nav-link group">
            <div className="flex items-center gap-x-3">
              {item.icon && <Icon icon={item.icon} />}
            </div>
            <ChevronDownIcon className="w-5 transition-transform duration-200 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-1 ml-3 space-y-1" as="ul">
            {item.children.map((child) => (
              <li key={`nav-item-${child.name}`}>
                <NavLink to={child.route}>
                  {child.icon && <Icon icon={child.icon} />}
                </NavLink>
              </li>
            ))}
          </DisclosurePanel>
        </Disclosure>
      ) : (
        <NavLink to={item.route} title={item.name}>
          {item.icon && <Icon icon={item.icon} />}
        </NavLink>
      )}
    </>
  );
}
