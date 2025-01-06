import { Client } from "@/types/client.type";
import EditClientForm from "./EditClientForm";
import { createClientDirectory } from "@/utils.ts";
import ManagementPanel from "./ManagementPanel.tsx";
import { addClient, deleteClient, updateClient } from "@/hooks/clients.ts";
import { useState } from "react";

export type ClientManagementProps = {
  clients: Client[] | null;
};

export default function ClientManagement({
  clients,
}: ClientManagementProps): JSX.Element {
  const [clientState, setClientState] = useState<Client[]>(clients ?? []);

  function handleSaveClient(client: Client) {
    if (client.clientId) {
      const updatedClients = updateClient(client.clientId, client);
      setClientState(updatedClients);
    } else {
      const clientId = `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      client.clientId = clientId;
      const updatedClients = addClient(client);
      setClientState(updatedClients);
    }
  }

  function handleDeleteClient(client: Client) {
    const updatedClients = deleteClient(client.clientId);
    setClientState(updatedClients);
  }
  const clientColumns = [
    { label: "Name", key: "name", sortable: true },
    { label: "Address", key: "location.formattedAddress", sortable: true },
  ];

  return (
    <ManagementPanel<Client>
      data={clientState}
      columns={clientColumns}
      formComponent={EditClientForm}
      handleSaveEntity={handleSaveClient}
      handleDeleteEntity={handleDeleteClient}
      directoryCreator={createClientDirectory}
      entityName="Client"
    />
  );
}
