import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import EditPlasticLocateForm from "../../routes/_layout/plastic-pipe-locates/-forms/EditPlasticLocateForm";
import Modal from "../Modal";
import { SelectWithLabelProps } from "../forms/SelectWithLabel";
import { PlasticLocate } from "../../types/locate.type";
import { useEffect, useState } from "react";
import { getUsers } from "../../hooks/users";

type EditPlasticLocateModalProps = {
  isNewLocateFormOpen: boolean;
  editLocate: PlasticLocate | null;
  handleSaveLocate: (locate: PlasticLocate, attachements: File[]) => void;
  handleDeleteLocate: (locate: PlasticLocate) => void;
  handleClose: () => void;
};

export default function EditPlasticLocateModal({
  isNewLocateFormOpen,
  editLocate,
  handleSaveLocate,
  handleDeleteLocate,
  handleClose,
}: EditPlasticLocateModalProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(isNewLocateFormOpen);
  const [selectedLocate, setSelectedLocate] = useState<PlasticLocate | null>(
    editLocate || null,
  );
  const [inspectors, setInspectors] = useState<SelectWithLabelProps["options"]>(
    [],
  );

  useEffect(() => {
    const users = getUsers();
    const inspectors = users.map((user) => ({
      value: user.uid,
      text: `${user.firstName} ${user.lastName}`,
    }));
    setInspectors(inspectors);
  }, []);

  useEffect(() => {
    setIsOpen(isNewLocateFormOpen);
  }, [isNewLocateFormOpen]);

  useEffect(() => {
    setSelectedLocate(editLocate || null);
  }, [editLocate]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={selectedLocate ? "Edit Locate" : "Add New Locate"}
      description=""
      icon={selectedLocate ? PencilIcon : PlusIcon}
    >
      <EditPlasticLocateForm
        selectedLocate={selectedLocate || null}
        handleCancel={handleClose}
        handleSaveLocate={handleSaveLocate}
        handleDeleteLocate={handleDeleteLocate}
        inspectors={inspectors}
      />
    </Modal>
  );
}
