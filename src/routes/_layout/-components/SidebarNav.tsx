import { Link } from "@tanstack/react-router";
import { LOGO } from "@/constants/logo";
import { NavStructure } from "@/types/nav.type";
import NavItem from "./NavItem";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import Icon from "@/components/Icon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

interface SidebarNavProps {
  nav: NavStructure | undefined;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SidebarNav({
  nav,
  sidebarOpen,
  setSidebarOpen,
}: SidebarNavProps) {
  return (
    <>
      {/*Sidebar transition for smaller screens */}
      <Transition show={sidebarOpen} as={Fragment}>
        <Dialog
          className="relative z-50 w-16 lg:hidden"
          onClose={setSidebarOpen}
        >
          <TransitionChild
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-primary-80" />
          </TransitionChild>

          <div className="fixed inset-0 flex w-16">
            <TransitionChild
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex flex-1 w-full max-w-xs mr-16">
                <TransitionChild
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 flex justify-center w-16 pt-5 left-14">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <Icon icon={XMarkIcon} />
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex-1 inset-y-0 left-0 z-50 block w-16 pb-4 overflow-y-auto bg-primary">
                  <div className="flex items-center justify-center h-16 shrink-0">
                    <Link to={nav && nav.dashboard[0].route}>
                      <img className="w-8 h-8" src={LOGO} alt="Gyreley Logo" />
                    </Link>
                  </div>
                  <nav className="mt-8">
                    <ul
                      role="list"
                      className="flex flex-col items-center space-y-1"
                    >
                      {nav &&
                        nav.dashboard.map((item, index) => (
                          <li key={item.name}>
                            <NavItem key={`ni-${index}`} item={item} />
                          </li>
                        ))}
                    </ul>
                  </nav>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      {/*Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-16 pb-4 overflow-y-auto bg-primary">
        <div className="flex items-center justify-center h-16 shrink-0">
          <Link to={nav && nav.dashboard[0].route}>
            <img className="w-auto h-8" src={LOGO} alt="Gyreley Logo" />
          </Link>
        </div>
        <nav className="mt-8">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {nav &&
              nav.dashboard.map((item, index) => (
                <li key={item.name}>
                  <NavItem key={`ni-${index}`} item={item} />
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
