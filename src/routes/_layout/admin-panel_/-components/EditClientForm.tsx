import { FormEvent, useState } from "react";
import InputWithLabel from "@components/forms/InputWithLabel";
import Button from "@components/Button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "@components/Modal";
import ConfirmDeleteForm from "@components/forms/ConfirmDeleteForm";
import { Client } from "@/types/client.type";
import { clientSchema } from "@/schemas/clientSchema";
import PlaceAutocomplete from "@/components/forms/AutoComplete";
import { Place } from "@/types/place.type";
import toast from "react-hot-toast";

interface EditClientFormProps {
  selectedEntity: Client | null;
  handleCancel: (value: boolean) => void;
  handleSaveEntity: (client: Client, isNewClient: boolean) => void;
  handleDeleteEntity: (client: Client) => void;
}

export default function EditClientForm({
  selectedEntity,
  handleCancel,
  handleSaveEntity,
  handleDeleteEntity,
}: EditClientFormProps) {
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [place, setPlace] = useState<Place | null>(
    selectedEntity?.location || null,
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: Client = {
      name: formData.get("name")?.toString() || "",
      location:
        place ||
        ({
          formattedAddress: "",
          url: "",
          lat: -1000,
          lng: -1000,
        } as Place),
      clientId: selectedEntity?.clientId || "",
    };

    const validationResult = clientSchema.safeParse(data);

    if (!validationResult.success) {
      const message = "invalid client format";
      toast.error(message);
      console.error(message);
      return;
    }

    const validData = validationResult.data;

    handleSaveEntity(validData, !!selectedEntity);
    handleCancel(false);
  }

  function handleConfirmDelete(client: Client) {
    handleDeleteEntity(client);
    setIsConfirmDeleteModalOpen(false);
    handleCancel(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center pb-5 border-b border-gray-900/10">
            <p className="mt-1 text-sm text-center leading-6 text-foreground">
              {selectedEntity
                ? `Please provide the updated information`
                : "Please enter the required information to add a new client"}
            </p>
          </div>
          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-2 mt-10 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <InputWithLabel
                  type="text"
                  label="Client Name"
                  id="name"
                  defaultValue={selectedEntity?.name || ""}
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <PlaceAutocomplete
                  onPlaceSelect={setPlace}
                  value={selectedEntity?.location?.formattedAddress}
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6 gap-x-6">
          <Button
            type="button"
            label="Cancel"
            className="bg-background text-foreground border"
            onClick={() => handleCancel(false)}
          />

          {selectedEntity && (
            <Button
              label="Delete"
              type="button"
              className="bg-destructive hover:bg-destructive-hover text-destructive-foreground"
              onClick={() => {
                setIsConfirmDeleteModalOpen(true);
              }}
            />
          )}

          <Button type="submit" label={selectedEntity ? "Update" : "Submit"} />
        </div>
      </form>
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        handleClose={() => setIsConfirmDeleteModalOpen(false)}
        title="Delete Client"
        description=""
        icon={ExclamationTriangleIcon}
      >
        <ConfirmDeleteForm
          onConfirmDelete={() => {
            if (selectedEntity) {
              handleConfirmDelete(selectedEntity);
            }
          }}
          onCancel={() => setIsConfirmDeleteModalOpen(false)}
          element="Client"
        />
      </Modal>
    </>
  );
}
