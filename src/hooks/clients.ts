
import { Client } from "@/types/client.type";
import { sessionStorageUtil } from "./sessionStorageUtil";
import mockClients from "../mockdb/clients.json";

const CLIENTS_KEY = "clients";

sessionStorageUtil.initialize(CLIENTS_KEY, mockClients);

function _readClients(): Client[] {
  return sessionStorageUtil.read<Client[]>(CLIENTS_KEY);
}

function _writeClients(clients: Client[]): void {
  sessionStorageUtil.write(CLIENTS_KEY, clients);
}

export const getClients = (): Client[] => {
  return _readClients();
};

export const addClient = (newClient: Client): Client[] => {
  const clients = _readClients();
  clients.push(newClient);
  _writeClients(clients);
  return clients;
};

export const updateClient = (clientId: string, updatedClient: Client): Client[] => {
  const clients = _readClients();
  const index = clients.findIndex((client) => client.clientId === clientId);
  if (index !== -1) {
    clients[index] = updatedClient;
    _writeClients(clients);
  }
  return clients;
};

export const deleteClient = (clientId: string): Client[] => {
  const clients = _readClients();
  const updatedClients = clients.filter((client) => client.clientId !== clientId);
  _writeClients(updatedClients);
  return updatedClients;
};

