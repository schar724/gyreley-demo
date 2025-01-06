import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { ComponentType, Fragment, ReactNode, SVGAttributes } from "react";
import Icon from "./Icon";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
  title: string;
  description?: string;
  icon?: ComponentType<SVGAttributes<SVGElement>> | null;
  handleClose: () => void;
}

export default function Modal({
  isOpen,
  children,
  title,
  description = "",
  icon = null,
  handleClose,
}: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        // initialFocus={<></>}
        onClose={handleClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity backdrop-blur-sm"></div>
        </TransitionChild>

        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:p-6">
                <div className="flex items-center justify-center gap-5">
                  {icon && <Icon icon={icon} className="w-5 h-5" />}
                  <DialogTitle className="font-bold font-boldflex">
                    {title}
                  </DialogTitle>
                </div>
                <Description>{description}</Description>
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
