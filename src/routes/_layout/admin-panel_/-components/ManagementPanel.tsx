import { useNavigate, useSearch } from "@tanstack/react-router";
import SortableTable, { Column } from "@components/SortableTable";
import Modal from "@/components/Modal";
import StackedList from "@/components/StackedList";
import MobileAddNewButton from "./MobileAddNewButton";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { generateProfilePhoto } from "@/utils";
import { Route } from "../index";
import { useMobileContext } from "@/context/MobileContext";

// Define a common management props type
export type ManagementPanelProps<T> = {
  data: T[]; // Can be User[] or Client[]
  columns: Column<T>[]; // Columns specific to User or Client
  formComponent: React.ComponentType<any>; // The form component for edit
  directoryCreator: (data: T[]) => any; // Function to create directory for StackedList
  handleSaveEntity: (data: T) => void;
  handleDeleteEntity: (data: T) => void;
  entityName: "User" | "Client"; // Entity name (User/Client) for labels
};

export default function ManagementPanel<T>({
  data,
  columns,
  formComponent: FormComponent,
  directoryCreator,
  handleSaveEntity,
  handleDeleteEntity,
  entityName,
}: ManagementPanelProps<T>): JSX.Element {
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);
  const navigate = useNavigate({ from: Route.to });
  const search = useSearch({ from: Route.id });
  const { mobile } = useMobileContext();

  function handleEditEntity(entity: T | null) {
    setSelectedEntity(entity);
    navigate({ search: { emo: true, type: search.type } });
  }

  function handleCloseModal() {
    navigate({ search: { type: search.type } }).then(() => {
      setSelectedEntity(null);
    });
  }

  // Define the title, sub-text, and image functions based on entity type (User or Client)
  const getTitle = (entity: T) =>
    entityName === "User"
      ? `${(entity as any).firstName} ${(entity as any).lastName}`
      : (entity as any).name;

  const getSubText = (entity: T) =>
    entityName === "User"
      ? (entity as any).email
      : (entity as any).location.formattedAddress;

  const getImageSrc = (entity: T) =>
    entityName === "User"
      ? (entity as any).imageUrl ||
        generateProfilePhoto(
          `${(entity as any).firstName} ${(entity as any).lastName}`,
        )
      : generateProfilePhoto((entity as any).name);

  console.log("mobile in managmenent panel ", mobile);

  return (
    <div className="flex flex-col flex-1 w-full h-full overflow-hidden rounded-lg">
      {mobile ? (
        <div className="h-full">
          <StackedList
            directory={directoryCreator(data)}
            handleTouchEvent={handleEditEntity}
            getTitle={getTitle}
            getSubText={getSubText}
            getImageSrc={getImageSrc}
          />
          <MobileAddNewButton emo={true} type={entityName} />
        </div>
      ) : (
        <div id="table-container" className="h-full w-full overflow-y-auto">
          <SortableTable<T>
            columns={columns}
            data={data}
            name={`${entityName}-management`}
            handleEditEntity={handleEditEntity}
          />
        </div>
      )}

      <Modal
        isOpen={search.emo || false}
        handleClose={handleCloseModal}
        title={selectedEntity ? `Edit ${entityName}` : `Add New ${entityName}`}
        description=""
        icon={selectedEntity ? PencilIcon : PlusIcon}
      >
        <FormComponent
          selectedEntity={selectedEntity}
          handleCancel={handleCloseModal}
          handleSaveEntity={handleSaveEntity}
          handleDeleteEntity={handleDeleteEntity}
        />
      </Modal>
    </div>
  );
}
