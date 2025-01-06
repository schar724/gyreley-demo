import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  onRequestClose: (value: boolean) => void; // Accept or deny callback
}

export default function PermissionRequestModal({
  isOpen,
  title,
  description = "",
  onRequestClose,
}: ModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => onRequestClose(false)} // Default close is denial
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
                <DialogTitle className="font-bold">{title}</DialogTitle>
                <p>{description}</p>

                {/* Button to Accept Permissions */}
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => onRequestClose(true)}
                    onTouchEnd={(e) => {
                      e.preventDefault(); // Prevent any default behavior like accidental scrolling
                      onRequestClose(true);
                    }}
                  >
                    Allow
                  </button>
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={() => onRequestClose(false)}
                    onTouchEnd={(e) => {
                      e.preventDefault(); // Prevent any default behavior like accidental scrolling
                      onRequestClose(false);
                    }}
                  >
                    Deny
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
