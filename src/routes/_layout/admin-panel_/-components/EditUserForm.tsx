import { FormEvent, useMemo, useState } from "react";
import InputWithLabel from "@components/forms/InputWithLabel";
import Button from "@components/Button";
import CheckBoxGroup, {
  TCheckBoxGroupItem,
} from "@components/forms/CheckBoxGroup";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Modal from "@components/Modal";
import ConfirmDeleteForm from "@components/forms/ConfirmDeleteForm";
import { User } from "@/types/user.type";
import { Role } from "@/types/role.type";
import { isRole } from "@/schemas/validator";
import { useAuth } from "@/context/AuthContext";
import { userSchema } from "@/schemas/userSchema";
import toast from "react-hot-toast";
import { Client } from "@/types/client.type";
import SelectWithLabel from "@/components/forms/SelectWithLabel";
import { useLoaderData } from "@tanstack/react-router";
import { Route } from "../index";

interface EditUserFormProps {
  selectedEntity: User | null;
  handleCancel: (value: boolean) => void;
  handleSaveEntity: (user: User, isNewUser: boolean) => void;
  handleDeleteEntity: (user: User) => void;
  isSysAdmin: boolean;
  clients: Client[] | null;
}

interface RoleDefs {
  [key: string]: string;
}
const roleDefs: RoleDefs = {
  sysAdmin: "System Administrator",
  clientAdmin: "Client Administrator",
  csr: "Customer Service Rep",
  user: "User",
};

export default function EditUserForm({
  selectedEntity,
  handleCancel,
  handleSaveEntity,
  handleDeleteEntity,
}: EditUserFormProps) {
  const [roleTypes] = useState<Role[]>([]);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const { clientId } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const { adminPanelData, isSysAdmin } = useLoaderData({ from: Route.id });

  const formattedRoles = useMemo(
    () => formatRolesForCheckBoxes(),
    [formatRolesForCheckBoxes, roleDefs],
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    const checkboxes = document.querySelectorAll(
      'span[role="checkbox"][data-headlessui-state="checked"]',
    );

    if (checkboxes.length === 0) {
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    checkboxes.forEach((checkbox) => {
      const role: Role = checkbox.id as Role;

      if (!isRole(role)) {
        return;
      }

      roleTypes.push(role);
    });

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || selectedEntity?.email || "",
      phoneNumber: formData.get("phoneNumber")?.toString().trim() || "",
      roles: roleTypes,
      authStatus: selectedEntity?.authStatus || "pending",
      clientId: formData.get("clientId")?.toString() || clientId,
      uid: selectedEntity?.uid || "",
    };

    const validationResult = userSchema.safeParse(data);

    if (!validationResult.success) {
      const message = "invalid user format";
      toast.error(message);
      console.error(validationResult.error);
      setIsLoading(false);
      return;
    }

    const validData = validationResult.data;

    handleSaveEntity(validData, !!selectedEntity);
    setIsConfirmDeleteModalOpen(false);
    setIsLoading(false);
    handleCancel(false);
  }

  function handleConfirmDelete(user: User) {
    handleDeleteEntity(user);
    setIsConfirmDeleteModalOpen(false);
    handleCancel(false);
  }

  // TODO: put this into callback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function formatRolesForCheckBoxes(): TCheckBoxGroupItem[] {
    const checkboxList: TCheckBoxGroupItem[] = [];
    const roleKeys = Object.keys(roleDefs) as Array<keyof typeof roleDefs>;

    for (const role of roleKeys) {
      checkboxList.push({
        id: role as string,
        label: roleDefs[role],
        checked:
          selectedEntity?.roles.some((userRole) => userRole === role) || false,
      });
    }

    return checkboxList;
  }

  function formatClientsForSelect(
    clients: Client[] | null,
  ): { value: string; text: string }[] {
    const clientsForSelect: { value: string; text: string }[] = [];
    if (!clients) {
      return clientsForSelect;
    }

    clients.forEach((client) => {
      clientsForSelect.push({ value: client.clientId, text: client.name });
    });

    return clientsForSelect;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="flex flex-col items-center justify-center pb-5 border-b border-gray-900/10">
            <p className="mt-1 text-sm text-center leading-6 text-foreground">
              {selectedEntity
                ? `Please provide the updated information`
                : "Please enter the required information to add a new user"}
            </p>
          </div>
          <div className="pb-12 border-b border-gray-900/10">
            <div className="grid grid-cols-2 mt-10 gap-x-6 gap-y-8 sm:grid-cols-2">
              <div className="col-span-2 sm:col-span-1">
                <InputWithLabel
                  type="text"
                  label="First Name"
                  id="firstName"
                  autoComplete="given-name"
                  defaultValue={selectedEntity?.firstName || ""}
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <InputWithLabel
                  type="text"
                  label="Last Name"
                  id="lastName"
                  autoComplete="lastName"
                  defaultValue={selectedEntity?.lastName || ""}
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <InputWithLabel
                  id="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  defaultValue={selectedEntity?.email || ""}
                  disabled={selectedEntity?.authStatus === "pending"}
                  required
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <InputWithLabel
                  id="phoneNumber"
                  label="Phone Number"
                  type="text"
                  autoComplete="phone_number"
                  defaultValue={selectedEntity?.phoneNumber || ""}
                  required
                />
              </div>

              {isSysAdmin && (
                <div className="col-span-2 sm:col-span-1">
                  <SelectWithLabel
                    id="clientId"
                    label="Client"
                    defaultValue={selectedEntity?.clientId || "default"}
                    options={formatClientsForSelect(adminPanelData.clients)}
                    required
                  />
                </div>
              )}
              <div className="col-span-2">
                <CheckBoxGroup
                  id="roleType"
                  groupName="Role Type"
                  options={formattedRoles}
                  isValid={isValid}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-6 gap-x-6">
          <Button
            type="button"
            label="Cancel"
            className="text-foreground bg-background border hover:bg-background-hover"
            onClick={() => handleCancel(false)}
          />

          {selectedEntity && (
            <Button
              label="Delete"
              type="button"
              className="bg-destructive hover:bg-destructive-hover"
              onClick={() => {
                setIsConfirmDeleteModalOpen(true);
              }}
            />
          )}

          <Button
            type="submit"
            label={selectedEntity ? "Update" : "Submit"}
            isLoading={isLoading}
          />
        </div>
      </form>
      <Modal
        isOpen={isConfirmDeleteModalOpen}
        handleClose={() => setIsConfirmDeleteModalOpen(false)}
        title="Delete User"
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
          element="User"
        />
      </Modal>
    </>
  );
}
